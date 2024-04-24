import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <div className="section">
        <h1 className="error">404</h1>
        <div className="page">
          Ooops!!! The page you are looking for is not found
        </div>
        <Link className="back-home" href="/">
          Back to home
        </Link>
      </div>
    </div>
  );
}
