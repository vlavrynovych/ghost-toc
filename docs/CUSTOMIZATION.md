# Customization Guide

Learn how to customize Ghost TOC to match your blog's design and style.

## Basic Customization

### Changing the Title

The simplest customization is changing the TOC title:

```html
<!-- Default English -->
<toc title="Table of Contents"></toc>

<!-- Short version -->
<toc title="Contents"></toc>

<!-- Descriptive -->
<toc title="What You'll Learn"></toc>
<toc title="In This Article"></toc>
<toc title="Jump To"></toc>

<!-- No title -->
<toc></toc>
```

### Collapsible Options

Control the collapsible behavior:

```html
<!-- Basic collapsible -->
<toc title="Contents" collapsible="true"></toc>

<!-- Custom button text -->
<toc
  title="Contents"
  collapsible="true"
  show-text="Open"
  hide-text="Close">
</toc>

<!-- Using symbols -->
<toc
  title="Contents"
  collapsible="true"
  show-text="▼ Show"
  hide-text="▲ Hide">
</toc>

<!-- Emoji buttons -->
<toc
  title="Contents"
  collapsible="true"
  show-text="👁️ Show"
  hide-text="🙈 Hide">
</toc>
```

### Color Schemes

Customize border and background colors for collapsible TOCs:

```html
<!-- Light theme -->
<toc
  collapsible="true"
  border-color="#e0e0e0"
  bg-color="#f9f9f9">
</toc>

<!-- Dark theme -->
<toc
  collapsible="true"
  border-color="#333333"
  bg-color="#1a1a1a">
</toc>

<!-- Blue accent -->
<toc
  collapsible="true"
  border-color="#3498db"
  bg-color="#ecf0f1">
</toc>

<!-- Green accent -->
<toc
  collapsible="true"
  border-color="#27ae60"
  bg-color="#d5f4e6">
</toc>

<!-- Warning style -->
<toc
  collapsible="true"
  border-color="#f39c12"
  bg-color="#fef5e7">
</toc>

<!-- Using CSS color names -->
<toc
  collapsible="true"
  border-color="gainsboro"
  bg-color="aliceblue">
</toc>
```

## Advanced Customization with CSS

### Overriding Default Styles

Add custom CSS in Ghost's Code Injection (Site Header or Site Footer):

```html
<style>
  /* Customize TOC title */
  toc .toc-title {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    text-align: left; /* Override default center alignment */
  }

  /* Customize TOC links */
  toc .table-of-contents a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  toc .table-of-contents a:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  /* Customize list styling */
  toc .table-of-contents ul {
    list-style-type: none;
    padding-left: 20px;
  }

  toc .table-of-contents li {
    margin: 8px 0;
    line-height: 1.6;
  }

  /* Add bullet points */
  toc .table-of-contents li::before {
    content: "▸ ";
    color: #3498db;
  }

  /* Customize collapsible container */
  toc .toc-container {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  /* Customize show/hide button */
  toc .toc-show-hide-button {
    color: #3498db;
    font-weight: 600;
  }

  toc .toc-show-hide-button:hover {
    color: #2980b9;
  }
</style>
```

### Theme-Specific Styles

#### Minimalist Style

```html
<style>
  toc .toc-title {
    font-size: 18px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #95a5a6;
  }

  toc .table-of-contents a {
    color: #2c3e50;
    font-size: 14px;
  }

  toc .toc-container {
    border-left: 3px solid #3498db;
    padding-left: 20px;
    background: transparent;
  }
</style>
```

#### Card Style

```html
<style>
  toc .toc-container {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 30px;
    background: #ffffff;
    border: 1px solid #ecf0f1;
  }

  toc .toc-title {
    font-size: 22px;
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #3498db;
  }
</style>
```

#### Dark Mode

```html
<style>
  toc .toc-container {
    background: #1a1a1a;
    border-color: #333333;
  }

  toc .toc-title {
    color: #ecf0f1;
  }

  toc .table-of-contents a {
    color: #3498db;
  }

  toc .table-of-contents a:hover {
    color: #5dade2;
  }
</style>
```

### Responsive Styles

Make your TOC mobile-friendly:

```html
<style>
  /* Desktop styles */
  toc .toc-container {
    max-width: 800px;
    margin: 20px auto;
  }

  /* Tablet */
  @media (max-width: 768px) {
    toc .toc-container {
      margin: 15px;
      padding: 15px;
    }

    toc .toc-title {
      font-size: 18px;
    }

    toc .table-of-contents a {
      font-size: 14px;
    }
  }

  /* Mobile */
  @media (max-width: 480px) {
    toc .toc-container {
      margin: 10px;
      padding: 12px;
    }

    toc .toc-title {
      font-size: 16px;
    }

    toc .table-of-contents ul {
      padding-left: 15px;
    }

    toc .table-of-contents a {
      font-size: 13px;
    }
  }
</style>
```

## Preset Configurations

### Configuration 1: Professional

```html
<toc
  title="Table of Contents"
  collapsible="true"
  show-text="Show Contents"
  hide-text="Hide Contents"
  border-color="#34495e"
  bg-color="#ecf0f1">
</toc>
```

### Configuration 2: Minimal

```html
<toc title="Contents"></toc>

<style>
  toc .toc-title {
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  toc .table-of-contents {
    border-left: 2px solid #3498db;
    padding-left: 15px;
  }
</style>
```

### Configuration 3: Bold & Colorful

```html
<toc
  title="📚 What's Inside"
  collapsible="true"
  show-text="👀 Show"
  hide-text="✅ Hide"
  border-color="#e74c3c"
  bg-color="#fadbd8">
</toc>
```

### Configuration 4: Enterprise

```html
<toc
  title="Document Contents"
  collapsible="true"
  show-text="Expand ▼"
  hide-text="Collapse ▲"
  border-color="#7f8c8d"
  bg-color="#ffffff">
</toc>

<style>
  toc .toc-container {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 6px;
  }

  toc .toc-title {
    font-family: 'Georgia', serif;
    font-size: 20px;
    color: #2c3e50;
  }
</style>
```

## Tips for Customization

### 1. Test in Multiple Browsers
Always test your customizations in different browsers to ensure consistent appearance.

### 2. Use Browser DevTools
Use F12 to inspect elements and test CSS changes live before adding them to Code Injection.

### 3. Maintain Contrast
Ensure sufficient color contrast for accessibility (especially for links and text).

### 4. Keep It Consistent
Match your TOC styling to your blog's overall design language.

### 5. Consider Mobile First
Test on mobile devices to ensure your TOC remains usable on small screens.

### 6. Use CSS Variables
For easier theme management:

```html
<style>
  :root {
    --toc-primary-color: #3498db;
    --toc-bg-color: #f9f9f9;
    --toc-border-color: #e0e0e0;
  }

  toc .table-of-contents a {
    color: var(--toc-primary-color);
  }

  toc .toc-container {
    background: var(--toc-bg-color);
    border-color: var(--toc-border-color);
  }
</style>
```

## Examples in Action

Check out these working examples:
- [Basic Example](../examples/basic-example.html) - Simple, clean TOC
- [Collapsible Example](../examples/collapsible-example.html) - Advanced collapsible TOC

## Need Inspiration?

Visit [Volodymyr's blog](https://lavr.site) to see Ghost TOC in production use.

## Got a Cool Custom Style?

Share it! Open a pull request adding your customization to this guide, or share it in the GitHub discussions.
