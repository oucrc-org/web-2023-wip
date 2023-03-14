import { ReactNode } from 'react';

/**
 * 記事ページ共通レイアウト
 */
export default async function ArticleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto mb-32 grow px-2 sm:px-4 md:px-10">
      {/* ここにメニューを置くとパスパラメータによる表示の変更ができない */}
      <div className="flex flex-col gap-y-6 pt-8">{children}</div>
    </div>
  );
}
