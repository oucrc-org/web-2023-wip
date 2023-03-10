import { envsafe, num, str } from 'envsafe';

/**
 * クライアントサイドで使用可能な環境変数
 */
export const clientEnv = envsafe({
  GTAG_ID: str({ input: process.env.NEXT_PUBLIC_GTAG_ID }),

  /** 部員一覧に表示する対象の年度数 デフォルトでは8年前の入部者まで表示 */
  MAX_MEMBER_YEARS: num({
    input: process.env.NEXT_PUBLIC_MAX_MEMBER_YEARS,
    allowEmpty: true,
    default: 8,
  }),
});
