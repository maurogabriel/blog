+++
title = "Primer Post"
date = 2026-06-07
+++

Hola mundo desde Zola.

We'll start by creating content/blog/\_index.md. This file tells Zola that blog is a section, which is how content is categorized in Zola. In the \_index.md file, we'll set the following variables in TOML format:

+++
title = "List of blog posts"
sort_by = "date"
template = "blog.html"
page_template = "blog-page.html"
+++

sort_by = "date" tells Zola to use the date to order our section pages (more on pages below).
template = "blog.html" tells Zola to use templates/blog.html as the template for listing the Markdown files in this section.
page_template = "blog-page.html" tells Zola to use templates/blog-page.html as the template for individual Markdown files.
For a full list of section variables, please see the section documentation.

The value of our title variable here is available to templates such as blog.html as {{ section.title }}.

If you now go to http://127.0.0.1:1111/blog/, you will see an empty list of posts.
