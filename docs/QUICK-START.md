# Quick Start Guide

Get Ghost TOC up and running in 5 minutes.

> **Upgrading from Gist?** This repository replaces the older Gist versions ([v1.0](https://gist.github.com/vlavrynovych/4111095383229db74e71aedf72652fc9), [v2.1](https://gist.github.com/vlavrynovych/3f244d0b7e9ea9a861d9427aa76486d1)). Just swap the old script for the new one - everything else stays the same!

## Step 1: Install the Script (2 minutes)

1. Open [dist/ghost-toc.min.js](../dist/ghost-toc.min.js) in this repository
2. Copy the entire contents (including `<script>` tags)
3. Go to your Ghost Admin → **Settings** → **Code Injection**
4. Paste into **Site Footer**
5. Click **Save**

✅ Done! The script is now active on your entire blog.

## Step 2: Add TOC to a Post (1 minute)

1. Open any post in Ghost editor
2. Click **+** to add a new block
3. Select **HTML** block
4. Add this code:
   ```html
   <toc title="Table of Contents"></toc>
   ```
5. Publish your post

✅ Your TOC will appear automatically!

## Step 3: Create a Reusable Snippet (2 minutes)

Instead of typing the TOC code every time:

1. With your HTML block selected (from Step 2)
2. Click the **⋮** (three dots) menu
3. Select **Save as snippet**
4. Name it "TOC"

✅ Now you can add TOC to any post by typing `/TOC`

> 💡 **New to Ghost snippets?** Learn more about how snippets work in Ghost's [official snippets guide](https://ghost.org/help/snippets/).

## Common Configurations

### Simple TOC
```html
<toc title="Contents"></toc>
```

### Collapsible TOC
```html
<toc
  title="Table of Contents"
  collapsible="true"
  show-text="Show"
  hide-text="Hide">
</toc>
```

### Styled Collapsible TOC
```html
<toc
  title="In This Article"
  collapsible="true"
  show-text="▼ Expand"
  hide-text="▲ Collapse"
  border-color="#e0e0e0"
  bg-color="#f9f9f9">
</toc>
```

### Multi-language TOC
Save different snippets for each language:

- **English**: `<toc title="Table of Contents"></toc>`
- **Spanish**: `<toc title="Tabla de Contenidos"></toc>`
- **German**: `<toc title="Inhaltsverzeichnis"></toc>`
- **French**: `<toc title="Table des Matières"></toc>`

## How It Works

Ghost TOC automatically:
1. Finds all headings (H2, H3, H4, H5, H6) in your article
2. Builds a nested list structure
3. Creates clickable links that jump to each section
4. Filters out Ghost's author name heading

## Tips

💡 **Place TOC after your intro**: Add the TOC after your opening paragraphs, before the main content

💡 **Use descriptive headings**: Your TOC is only as good as your heading structure

💡 **Test in preview**: Always preview your post to verify TOC appears correctly

💡 **Heading IDs required**: Ghost automatically adds IDs to headings - if links don't work, check that headings have `id` attributes

## Troubleshooting

### TOC doesn't appear
- Check browser console (F12) for errors
- Verify script is in **Site Footer** (not header)
- Ensure you're using lowercase `<toc>` not `<TOC>`

### Links don't work
- Ghost should automatically add IDs to headings
- If using custom HTML headings, add IDs manually: `<h2 id="my-section">My Section</h2>`

### Styling looks wrong
- Your theme CSS might conflict - check browser inspector
- Add custom CSS in Code Injection if needed

## Next Steps

- 📖 Read the [full installation guide](INSTALLATION.md) for advanced options
- 🔍 Check [examples](../examples/) for working demos
- 🎨 Customize styling to match your theme
- 📚 See [README](../README.md) for all configuration options

## Need Help?

- Check the [troubleshooting section](INSTALLATION.md#troubleshooting) in the installation guide
- Review the [examples](../examples/) directory
- Open an issue on GitHub

---

**Time invested**: 5 minutes | **Benefit**: Enhanced navigation for all your blog posts 🚀