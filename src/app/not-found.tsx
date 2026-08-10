import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        background: "#ffffff",
        color: "#032b41",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "520px" }}>
        <p style={{ marginBottom: "10px", fontWeight: 800, color: "#2a9d67" }}>
          404
        </p>
        <h1 style={{ margin: "0 0 14px", fontSize: "clamp(2rem, 7vw, 4rem)" }}>
          This page isn&apos;t in the library.
        </h1>
        <p style={{ margin: "0 0 24px", lineHeight: 1.7, color: "#617681" }}>
          The link may be outdated, or the page may have moved.
        </p>
        <Link
          href="/for-you"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: "7px",
            background: "#2bd97f",
            color: "#032b41",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Browse books
        </Link>
      </div>
    </main>
  );
}
