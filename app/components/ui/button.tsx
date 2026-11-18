import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-foreground/20 bg-background/30 shadow-xs backdrop-blur-md hover:bg-accent hover:text-accent-foreground dark:border-input",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        pill: "h-12 rounded-full px-7 text-base has-[>svg]:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Letter roll adapted from Skiper UI "skiper58" (TextRoll), https://skiper-ui.com, by
 * @gurvinder-singh02, rewritten in CSS so it works in server components. Each letter
 * rolls up on hover and its copy rolls in from below, with a small stagger.
 */
function RollText({ text }: { text: string }) {
  const letters = text.split("")
  const layer = (name: string) => (
    <span aria-hidden="true" className={cn("block", name, name === "roll-bottom" && "absolute inset-0")}>
      {letters.map((letter, i) => (
        <span key={i} className="roll-letter inline-block" style={{ transitionDelay: `${i * 12}ms` }}>
          {letter}
        </span>
      ))}
    </span>
  )
  return (
    <span className="relative block overflow-hidden whitespace-pre">
      <span className="sr-only">{text}</span>
      {layer("roll-top")}
      {layer("roll-bottom")}
    </span>
  )
}

// Swaps every text node inside the button (including inside an asChild Link) for RollText.
function withRoll(node: React.ReactNode): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      const text = String(child).trim()
      return text ? <RollText text={text} /> : null
    }
    if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children != null) {
      return React.cloneElement(child, undefined, withRoll(child.props.children))
    }
    return child
  })
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "link"
        ? children
        : asChild && React.isValidElement<{ children?: React.ReactNode }>(children)
          ? React.cloneElement(children, undefined, withRoll(children.props.children))
          : withRoll(children)}
    </Comp>
  )
}

export { Button, buttonVariants }
