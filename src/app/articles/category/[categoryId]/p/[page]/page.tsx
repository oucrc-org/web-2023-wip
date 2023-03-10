import {
  getAllArticles,
  getAllCategories,
  getArticles,
  getCategory,
} from '@/utils/micro-cms';
import { Metadata } from 'next';
import ArticleList from '@/components/ArticleList';
import { ARTICLE_PER_PAGE } from '@/config/const';
import { notFound } from 'next/navigation';

export const revalidate = 600;

type Params = {
  params: { categoryId: string; page: string };
};

export async function generateStaticParams() {
  const categories = await getAllCategories();
  const paths = await Promise.all(
    categories.contents
      .map(async ({ id: categoryId }) => {
        return await getAllArticles({ categoryId }).then((articles) => {
          // 必要なページ数を計算
          const pages = Math.ceil(articles.contents.length / ARTICLE_PER_PAGE);
          return Array.from({ length: pages }, (_, i) =>
            (i + 1).toString()
          ).map((page) => ({
            categoryId,
            page,
          }));
        });
      })
      .flat(1)
  );
  return paths.flat(1);
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata | void> {
  const category = await getCategory(params.categoryId);
  if (category) {
    return {
      title: `${category.category}の記事一覧 ${params.page}ページ目`,
    };
  }
}

export default async function ArticleCategoryIndexPage({
  params: { categoryId, page },
}: Params) {
  const pageNumber = page ? Number(page) : 1;
  const articles = await getArticles(pageNumber, {
    categoryId,
  });
  if (articles.contents.length === 0) {
    notFound();
  }

  return (
    <>
      <ArticleList
        data={articles}
        pageNumber={pageNumber}
        paginationPath={`/articles/category/${categoryId}`}
      />
    </>
  );
}
