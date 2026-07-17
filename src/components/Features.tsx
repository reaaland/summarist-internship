import {
  AiFillAudio,
  AiFillBulb,
  AiFillFileText,
} from "react-icons/ai";

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Understand books in a few minutes
          </h2>

          <div className="features__wrapper">
            <div className="features">
              <div className="features__icon">
                <AiFillFileText />
              </div>

              <h3 className="features__title">Read or listen</h3>

              <p className="features__sub--title">
                Save time by getting the core ideas from the best books.
              </p>
            </div>

            <div className="features">
              <div className="features__icon">
                <AiFillBulb />
              </div>

              <h3 className="features__title">Find your next read</h3>

              <p className="features__sub--title">
                Explore book lists and personalized recommendations.
              </p>
            </div>

            <div className="features">
              <div className="features__icon">
                <AiFillAudio />
              </div>

              <h3 className="features__title">Briefcasts</h3>

              <p className="features__sub--title">
                Gain valuable insights from briefcasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}