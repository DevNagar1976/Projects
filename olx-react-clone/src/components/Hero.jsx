export default function Hero({ onSell }) {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <span className="hero-pill">India's local marketplace</span>
        <h1>Find it. Love it. Make it yours.</h1>
        <p>Buy and sell cars, phones, bikes, homes and more near you.</p>
        <button onClick={onSell}>Post your ad for free</button>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="bubble bubble-one">🚗</div>
        <div className="bubble bubble-two">📱</div>
        <div className="bubble bubble-three">🏠</div>
      </div>
    </section>
  );
}
