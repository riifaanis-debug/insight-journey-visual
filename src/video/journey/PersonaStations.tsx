import React from "react";
import { C, seg, groupColor } from "../theme";
import { FSTACK } from "../font";
import { Station } from "./Station";
import { PERSONA_DEFS, PERSONA_INTRO } from "./personaData";

const G = groupColor("understanding");

const Panel: React.FC<{
  o: number;
  children: React.ReactNode;
  width?: number;
}> = ({ o, children, width = 1320 }) => (
  <div
    dir="rtl"
    style={{
      width,
      margin: "0 auto",
      background: C.white,
      border: `3px solid ${C.line}`,
      borderTop: `12px solid ${G.main}`,
      borderRadius: 34,
      padding: "54px 60px",
      boxShadow: "0 30px 80px rgba(14,75,60,0.12)",
      fontFamily: FSTACK,
      opacity: o,
      transform: `translateY(${(1 - o) * 26}px)`,
    }}
  >
    {children}
  </div>
);

const Head: React.FC<{ ar: string; en: string; badge?: string }> = ({
  ar,
  en,
  badge,
}) => (
  <div style={{ marginBottom: 34 }}>
    {badge ? (
      <div
        style={{
          display: "inline-block",
          fontSize: 30,
          fontWeight: 700,
          color: G.main,
          background: G.light,
          borderRadius: 999,
          padding: "10px 26px",
          marginBottom: 20,
        }}
      >
        {badge}
      </div>
    ) : null}
    <div style={{ fontSize: 62, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>
      {ar}
    </div>
    <div
      dir="ltr"
      style={{
        fontSize: 40,
        fontWeight: 600,
        color: G.soft,
        marginTop: 8,
        textAlign: "right",
      }}
    >
      {en}
    </div>
  </div>
);

const Body: React.FC<{ children: React.ReactNode; o?: number }> = ({
  children,
  o = 1,
}) => (
  <div
    style={{
      fontSize: 42,
      lineHeight: 1.75,
      color: C.ink,
      opacity: o,
      marginBottom: 22,
    }}
  >
    {children}
  </div>
);

export const PersonaStations: React.FC = () => (
  <>
    {/* لوحة تمهيدية — الشخصيات الأساسية */}
    <Station id="p00" top={0} pad={430} width={1400}>
      {(f) => (
        <Panel o={seg(f, 6, 34)} width={1400}>
          <Head ar={PERSONA_INTRO.ar} en={PERSONA_INTRO.en} />
          {PERSONA_INTRO.paras.map((p, i) => (
            <Body key={i} o={seg(f, 30 + i * 34, 70 + i * 34)}>
              {p}
            </Body>
          ))}
          <div
            style={{
              marginTop: 16,
              background: G.light,
              borderRight: `10px solid ${C.gold}`,
              borderRadius: 20,
              padding: "26px 30px",
              fontSize: 38,
              lineHeight: 1.6,
              color: C.green,
              fontWeight: 600,
              opacity: seg(f, 104, 148),
            }}
          >
            {PERSONA_INTRO.note}
          </div>
        </Panel>
      )}
    </Station>

    {/* ثماني لوحات — شخصية لكل لوحة */}
    {PERSONA_DEFS.map((p, i) => (
      <Station
        key={p.en}
        id={`p${String(i + 1).padStart(2, "0")}`}
        top={0}
        pad={300}
        width={1400}
      >
        {(f) => (
          <Panel o={seg(f, 6, 32)}>
            <Head
              ar={p.ar}
              en={p.en}
              badge={`شخصية ${i + 1} من ${PERSONA_DEFS.length}`}
            />
            <Body o={seg(f, 28, 76)}>{p.body}</Body>
          </Panel>
        )}
      </Station>
    ))}
  </>
);
