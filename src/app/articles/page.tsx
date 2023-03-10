import { getArticles } from '@/utils/micro-cms';
import ArticleList from '@/components/ArticleList';
import CategoryMenu from '@/components/CategoryMenu';
import SeriesMenu from '@/components/SeriesMenu';

export const revalidate = 600;

export const metadata = {
  title: '記事一覧',
  description:
    'OUCRC（岡山大学電子計算機研究会）の皆さんの書いた記事の一覧です！',
};

export default async function ArticlePage() {
  const articles = await getArticles(1);
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CategoryMenu />
      {/* @ts-expect-error Server Component */}
      <SeriesMenu />
      <ArticleList
        data={articles}
        pageNumber={1}
        paginationPath={`/articles`}
      />
    </>
  );
}
