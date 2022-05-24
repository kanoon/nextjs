// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

import { ExecOptions } from "child_process";

// type Data = {
//   text: string;
// };

// export default async function fetchData(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const ex_res = await fetch(
//     ``
//   );
//   const ex_data = await ex_res.text();
//   res.status(200).json({ text: ex_data });
// }

export const fetchPublicData = async (): Promise<string> => {
  const res = await fetch(``);
  const result = await res.text();

  return result;
};

export const fetchPrivateData = async (): Promise<string> => {
  try {
    const res = await fetch(``);
    const result = await res.text();

    return result;
  } catch (ex: any) {
    console.log(ex);
    return ex.toString();
  }
};
