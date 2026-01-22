# Installation Guide

This guide will walk you through the process of installing Ghost TOC on your Ghost blog.

> **Migrating from Gist?** If you're currently using one of the older Gist versions ([v1.0](https://gist.github.com/vlavrynovych/4111095383229db74e71aedf72652fc9) or [v2.1](https://gist.github.com/vlavrynovych/3f244d0b7e9ea9a861d9427aa76486d1)), simply replace the old script in Ghost's Code Injection with the new version from `dist/ghost-toc.min.js`. No changes needed to your existing `<toc>` tags!

## Method 1: Code Injection (Recommended)

This is the easiest method and doesn't require modifying your theme files.

### Steps:

1. **Copy the Script**
   - Navigate to the `dist` folder in this repository
   - Open `ghost-toc.min.js` and copy the entire contents

2. **Access Ghost Admin**
   - Log in to your Ghost admin panel
   - The URL is typically `https://yourblog.com/ghost`

3. **Open Code Injection Settings**
   - Click on **Settings** in the left sidebar
   - Scroll down and click on **Code Injection**

4. **Paste the Script**
   - In the **Site Footer** section, paste the entire script
   - This ensures the script loads on all pages

5. **Save Changes**
   - Click the **Save** button in the top right corner

6. **Create a Reusable Snippet (Recommended)**
   - Open any post in the Ghost editor
   - Click the **+** button to add a block
   - Select **HTML** block
   - Add your TOC tag:
     ```html
     <toc title="Table of Contents"></toc>
     ```
   - Click the **⋮** (three dots) menu on the block
   - Select **Save as snippet**
   - Name it something memorable like "TOC" or "Table of Contents"
   - Now you can quickly insert TOC in any post by typing `/` and selecting your snippet

   > 💡 **Learn more about Ghost snippets:** [Ghost's official snippets guide](https://ghost.org/help/snippets/)

7. **Test It Out**
   - Add some headings to your post (H2, H3, etc.)
   - Publish and view your post to see the TOC in action

## Method 2: Theme Integration

For more control or if you prefer to include it directly in your theme.

### Steps:

1. **Access Your Theme Files**
   - Download your current Ghost theme or access it via FTP/SFTP
   - Ghost themes are typically located in `content/themes/your-theme-name/`

2. **Add the Script File**
   - Copy `src/ghost-toc.js` to your theme's `assets/js/` directory

3. **Include in Theme**
   - Open your theme's `default.hbs` file (or the main template file)
   - Add the following before the closing `</body>` tag:
     ```html
     <script src="{{asset "js/ghost-toc.js"}}"></script>
     ```

4. **Upload and Activate**
   - If you downloaded the theme, zip it and upload through Ghost admin
   - Navigate to **Settings** → **Design** → **Upload theme**
   - Activate your theme

5. **Test It Out**
   - Create a post and add the TOC tag as described in Method 1

## Verification

After installation, verify that Ghost TOC is working:

1. Create a test post with multiple headings:
   ```html
   <toc title="Contents"></toc>

   ## Section 1
   Content here...

   ## Section 2
   Content here...

   ### Subsection 2.1
   Content here...
   ```

2. Publish the post and check that:
   - The TOC appears where you placed the `<toc>` tag
   - All headings are listed in the TOC
   - Clicking links navigates to the correct sections
   - Collapsible functionality works (if enabled)

## Troubleshooting

### TOC doesn't appear

- **Check script placement**: Ensure the script is in the Site Footer, not Site Header
- **Check browser console**: Open developer tools (F12) and look for JavaScript errors
- **Verify tag syntax**: Make sure you're using `<toc>` not `<TOC>` (lowercase matters)

### TOC shows but links don't work

- **Check heading IDs**: Ghost automatically generates IDs for headings. Verify headings have `id` attributes
- **Check for JavaScript conflicts**: Other scripts might be interfering. Try disabling other custom scripts temporarily

### Styling issues

- **Check CSS conflicts**: Your theme's CSS might be overriding TOC styles
- **Add custom CSS**: Use Ghost's code injection to add custom styles if needed

### Collapsible not working

- **Verify attribute**: Ensure `collapsible="true"` is set (must be string "true", not boolean)
- **Check JavaScript**: Open browser console for errors

## Pro Tips

### Save Time with Snippets
Create different snippets for different TOC styles:
- Basic TOC: `<toc title="Table of Contents"></toc>`
- Collapsible TOC: `<toc title="Contents" collapsible="true"></toc>`
- Custom styled: `<toc title="In This Article" collapsible="true" show-text="▼ Show" hide-text="▲ Hide" border-color="#e0e0e0" bg-color="#f9f9f9"></toc>`

Snippets are reusable content blocks in Ghost that you can insert into any post with a simple slash command. [Learn more about snippets](https://ghost.org/help/snippets/).

### Multi-language Blogs
If you run a multi-language blog, create language-specific snippets:
- English: `<toc title="Table of Contents"></toc>`
- Spanish: `<toc title="Tabla de Contenidos"></toc>`
- French: `<toc title="Table des Matières"></toc>`

### Advantages of This Approach

✅ **Single Point of Maintenance**: Update the script once in Code Injection, and all posts update automatically

✅ **Reduced Database Size**: No duplicated scripts in every post - just a small HTML tag

✅ **Easy Updates**: When new versions are released, update the footer script and all TOCs benefit immediately

✅ **Consistent Behavior**: All TOCs across your blog work identically

## Next Steps

Once installed, check out:
- [Usage examples](../examples/) for different configurations
- [README](../README.md) for all available options
- Customize the styling to match your blog's theme

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the examples in the `examples/` directory
3. Open an issue on GitHub with details about your problem