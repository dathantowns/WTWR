import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/dathantowns" className="footer__signature">
        Developed by Day.
      </a>
      {new Date().getFullYear()}
    </div>
  );
}
