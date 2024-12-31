import { commonSettingsApi } from "@/service/common";

export async function Metadata() {
  const response = await commonSettingsApi();
  const data = response.success ? response.data.settings : {};

  return (
    <>
      <title>{data?.meta_title || "Sikkhon"}</title>
      <meta
        name="description"
        content={data?.meta_description || "Sikkhon"}
      />
      <meta name="keywords" content={data?.meta_keywords || "Sikkhon"} />
      <meta name="author" content={data?.meta_author || "Sikkhon"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />
    </>
  );
}

