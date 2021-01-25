import { useRouter } from "next/router";
import GoogleFonts from "next-google-fonts";

import Heading from "@components/Heading/Heading";

function getFontSize(length) {
  if (length > 55) {
    return `text-6xl`;
  }
  if (length > 32) {
    return `text-7xl`;
  }
  return `text-8xl`;
}

export default function BlogJskonecznyPl() {
  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const link = searchParams.get("url");

  if (!link) return null;

  const title = searchParams.get("title");

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" />
      <div
        className="relative flex flex-col justify-between px-8 pt-24 pb-16 space-y-8 shadow-md"
        style={{
          width: 1200,
          height: 630,
          borderWidth: 16,
          background: "#fafafa",
          borderColor: "#2D2B2B",
        }}
      >
        <div className="max-w-screen-lg">
          <Heading
            noMargin
            className={`${getFontSize(title.length)}`}
            style={{ color: "#e84f7a" }}
          >
            {title}
          </Heading>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <img
              src="https://blog.jskoneczny.pl/static/img/profile-photo.jpg"
              alt="Jakub Skoneczny's profile photo"
              className="flex-none w-32 h-32 rounded-full shadow-md handsome"
            />
            <div className="flex flex-col" style={{ color: "#2D2B2B" }}>
              <p className="text-4xl font-semibold font-open-sans">
                blog.jskoneczny.pl
              </p>
              <p className="text-2xl font-open-sans">
                <span className="path">{link}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
