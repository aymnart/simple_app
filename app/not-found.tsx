"use client";
import "@/css/not-found.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="room">
      <div className="cuboid">
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
      </div>
      <div className="oops">
        <h2>OOPS!</h2>
        <p>We can&apos;t find the page that you&apos;re looking for :(</p>
      </div>
      <div className="center-line">
        <div className="hole">
          <div className="ladder-shadow"></div>
          <div className="ladder"></div>
        </div>
        <div className="four">4</div>
        <div className="four">4</div>
        <div className="btn">
          <Link href="/">BACK TO HOME</Link>
        </div>
      </div>
    </div>
  );
}
