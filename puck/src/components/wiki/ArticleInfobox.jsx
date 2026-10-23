import React from "react";
import "./ArticleInfobox.css";

export default function ArticleInfobox({ title, subtitle, image, imageCaption, fields = [] }) {
  if (!fields || fields.length === 0) return null;

  return (
    <aside className="article-infobox" aria-label="Article Specifications Infobox">
      <div className="article-infobox-header">
        <h3 className="article-infobox-title">{title}</h3>
        {subtitle && <div className="article-infobox-subtitle">{subtitle}</div>}
      </div>

      {image && (
        <div className="article-infobox-image-box">
          <img
            src={image}
            alt={title}
            className="article-infobox-img"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {imageCaption && <div className="article-infobox-caption">{imageCaption}</div>}
        </div>
      )}

      <table className="article-infobox-table">
        <tbody>
          {fields.map((field, idx) => (
            <tr key={idx} className="article-infobox-row">
              <th scope="row" className="article-infobox-label">
                {field.label}
              </th>
              <td className="article-infobox-value">
                {Array.isArray(field.value) ? (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {field.value.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                ) : (
                  field.value || "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
