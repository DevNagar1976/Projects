export default function DesignCanvas({ design, zoom, canvasRef }) {
  const style = {
    '--bg': design.backgroundColor,
    '--accent': design.accentColor,
    '--text': design.textColor,
    '--zoom': zoom / 100,
    fontFamily: design.fontFamily
  };

  return (
    <div className="canvas-stage">
      <div ref={canvasRef} className={`poster-canvas template-${design.templateId}`} style={style}>
        <div className="poster-glow glow-one" />
        <div className="poster-glow glow-two" />
        {design.imageUrl && <img className="uploaded-background" src={design.imageUrl} alt="User upload" />}
        <div className="poster-overlay" />
        <div className="eyebrow"><span /> CREATE • SHARE • INSPIRE</div>
        <div className="poster-copy" style={{ textAlign: design.textAlign }}>
          <h1 style={{ fontSize: `${design.fontSize}px` }}>{design.text}</h1>
          <p>{design.subtitle}</p>
        </div>
        <div className="poster-footer"><strong>CANVA</strong><span>YOURSTUDIO.COM</span></div>
      </div>
    </div>
  );
}
