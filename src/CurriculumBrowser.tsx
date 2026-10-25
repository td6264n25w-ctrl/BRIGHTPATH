
import { useState } from "react";
import { curriculumMap } from "./curriculum-map";
import type { SubjectId } from "./curriculum-map";

export default function CurriculumBrowser() {
  const [subjectId, setSubjectId] = useState<SubjectId>("math");
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const subject = curriculumMap.find(
    (item) => item.id === subjectId,
  );

  if (!subject) {
    return <p>Curriculum is temporarily unavailable.</p>;
  }

  const colors = {
    math: {
      background: "#E3EEFF",
      accent: "#2459B8",
    },
    "language-arts": {
      background: "#FCE7F3",
      accent: "#A52261",
    },
  };

  const color = colors[subjectId];

  const cardStyle = {
    background: "#FFFFFF",
    border: "1px solid #E4E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  } as const;

  const buttonStyle = {
    border: "1px solid #E4E8F0",
    borderRadius: 12,
    padding: "12px 14px",
    minHeight: 44,
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  } as const;

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Explore your learning path</h2>

      <p style={{ color: "#667085", lineHeight: 1.5 }}>
        Choose a subject to discover the skills you can learn,
        practice, and master.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 10,
          margin: "18px 0",
        }}
      >
        <button
          onClick={() => {
            setSubjectId("math");
            setExpandedUnit(null);
          }}
          style={{
            ...buttonStyle,
            background: subjectId === "math" ? "#E3EEFF" : "#FFFFFF",
            color: subjectId === "math" ? "#2459B8" : "#172033",
            borderColor: subjectId === "math" ? "#8CB4FF" : "#E4E8F0",
          }}
        >
          🔢 Math
        </button>

        <button
          onClick={() => {
            setSubjectId("language-arts");
            setExpandedUnit(null);
          }}
          style={{
            ...buttonStyle,
            background:
              subjectId === "language-arts" ? "#FCE7F3" : "#FFFFFF",
            color:
              subjectId === "language-arts" ? "#A52261" : "#172033",
            borderColor:
              subjectId === "language-arts" ? "#F3A8CE" : "#E4E8F0",
          }}
        >
          📚 Language Arts
        </button>
      </div>

      <div
        style={{
          background: color.background,
          borderRadius: 16,
          padding: 16,
          marginBottom: 18,
        }}
      >
        <h3 style={{ margin: "0 0 6px", color: color.accent }}>
          {subject.title}
        </h3>
        <p style={{ margin: 0, lineHeight: 1.5 }}>
          {subject.description}
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 12 }}>
          {subject.units.length} learning units
        </p>
      </div>

      {subject.units.map((unit) => {
        const isExpanded = expandedUnit === unit.id;

        return (
          <article key={unit.id} style={cardStyle}>
            <button
              onClick={() =>
                setExpandedUnit(isExpanded ? null : unit.id)
              }
              aria-expanded={isExpanded}
              style={{
                ...buttonStyle,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                textAlign: "left",
                background: "#FFFFFF",
                color: "#172033",
              }}
            >
              <span>{unit.title}</span>
              <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
            </button>

            <p
              style={{
                color: "#667085",
                fontSize: 14,
                lineHeight: 1.5,
                marginBottom: 0,
              }}
            >
              {unit.description}
            </p>

            <p style={{ fontSize: 12, color: "#667085" }}>
              Suggested grade range: {unit.gradeBand.min}–
              {unit.gradeBand.max}
            </p>

            {isExpanded && (
              <div style={{ marginTop: 14 }}>
                <h4 style={{ marginBottom: 10 }}>Skills in this unit</h4>

                {unit.skills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      borderTop: "1px solid #E4E8F0",
                      padding: "12px 0",
                    }}
                  >
                    <strong>{skill.title}</strong>

                    {skill.description && (
                      <p
                        style={{
                          color: "#667085",
                          fontSize: 13,
                          lineHeight: 1.5,
                          margin: "5px 0",
                        }}
                      >
                        {skill.description}
                      </p>
                    )}

                    {skill.prerequisites.length > 0 && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#667085",
                          marginBottom: 0,
                        }}
                      >
                        Builds on:{" "}
                        {skill.prerequisites.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
}
