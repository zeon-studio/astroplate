---
import BlogCard from "@/components/BlogCard.astro";
import Pagination from "@/components/Pagination.astro";
import config from "@/config/config.json";
import Base from "@/layouts/Base.astro";
import { getSinglePage } from "@/lib/contentParser.astro";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader.astro";
import PostSidebar from "@/partials/PostSidebar.astro";
import { getEntry } from "astro:content";

const BLOG_FOLDER = "blog";

const postIndex = await getEntry(BLOG_FOLDER, "-index");
const posts = await getSinglePage(BLOG_FOLDER);
const allCategories = await getAllTaxonomy(BLOG_FOLDER, "categories");
const categories = await getTaxonomy(BLOG_FOLDER, "categories");
const tags = await getTaxonomy(BLOG_FOLDER, "tags");
const sortedPosts = sortByDate(posts);
const totalPages: number = Math.ceil(posts.length / config.settings.pagination);
const currentPosts = sortedPosts.slice(0, config.settings.pagination);
---

<Base
  title={postIndex.data.title}
  meta_title={postIndex.data.meta_title}
  image={postIndex.data.image}
  description={postIndex.data.description}
>
  <PageHeader title={postIndex.data.title} />
  <section class="section">
    <div class="container">
      <div class="row gx-5">
        <!-- blog posts -->
        <div class="lg:col-8">
          <div class="row">
            {
              currentPosts.map((post) => (
                <div class="mb-14 md:col-6">
                  <BlogCard data={post} />
                </div>
              ))
            }
          </div>
          <Pagination
            section={BLOG_FOLDER}
            currentPage={1}
            totalPages={totalPages}
          />
        </div>

        <!-- sidebar -->
        <PostSidebar
          categories={categories}
          tags={tags}
          allCategories={allCategories}
        />
      </div>
    </div>
  </section>
</Base>
