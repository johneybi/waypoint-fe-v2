# Design Tokens

This document contains the design tokens extracted from the Figma project. These tokens should be used for all UI development to ensure consistency.

## Colors

| Token Name            | Value     | Description/Usage                   |
| --------------------- | --------- | ----------------------------------- |
| `primary`             | `#0EA5E9` | Main brand color (Sky 500)          |
| `hover:primary`       | `#0284C7` | Hover state for primary actions     |
| `foreground`          | `#1C2024` | Main text color                     |
| `background`          | `#FAFAFA` | Page background                     |
| `card`                | `#F0F0F0` | Card background                     |
| `popover`             | `#FFFFFF` | Popover/Dropdown background         |
| `primary-foreground`  | `#FFFFFF` | Text on primary color               |
| `muted-foreground`    | `#757575` | Secondary text color                |
| `accent`              | `#E0F2FE` | Accent background (Sky 100)         |
| `border`              | `#E2E2E2` | Borders                             |
| `input`               | `#F0F0F0` | Input fields                        |
| `checkbox`            | `#F0F0F0` | Checkbox background                 |
| `secondary`           | `#A3A3A3` | Secondary elements                  |
| `secondary-hover`     | `#838383` | Hover state for secondary elements  |
| `destructive`         | `#E46962` | Destructive actions (Error/Delete)  |
| `hover:destructive`   | `#DC2626` | Hover state for destructive actions |
| `success`             | `#16A34A` | Success states                      |
| `disabled`            | `#E5E5E5` | Disabled background                 |
| `disabled-foreground` | `#A3A3A3` | Disabled text                       |

## Tailwind Config Reference

(For easy copy-pasting into `tailwind.config.ts` if needed)

```ts
colors: {
  border: "hsl(var(--border))", // #E2E2E2
  input: "hsl(var(--input))", // #F0F0F0
  ring: "hsl(var(--ring))", // #0EA5E9 (Primary)
  background: "hsl(var(--background))", // #FAFAFA
  foreground: "hsl(var(--foreground))", // #1C2024
  primary: {
    DEFAULT: "#0EA5E9",
    foreground: "#FFFFFF",
  },
  secondary: {
    DEFAULT: "#A3A3A3",
    foreground: "#1C2024",
  },
  destructive: {
    DEFAULT: "#E46962",
    foreground: "#FFFFFF",
  },
  muted: {
    DEFAULT: "#F0F0F0", // Card/Input color
    foreground: "#757575",
  },
  accent: {
    DEFAULT: "#E0F2FE",
    foreground: "#1C2024",
  },
  popover: {
    DEFAULT: "#FFFFFF",
    foreground: "#1C2024",
  },
  card: {
    DEFAULT: "#F0F0F0",
    foreground: "#1C2024",
  },
}
```
