export default function Statistics() {
  const leftHeadings = [
    "Enhance your knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

  const leftStats = [
    {
      number: "93%",
      text: (
        <>
          of Summarist members <b>significantly increase</b> reading frequency.
        </>
      ),
    },
    {
      number: "96%",
      text: (
        <>
          of Summarist members <b>establish better</b> habits.
        </>
      ),
    },
    {
      number: "90%",
      text: (
        <>
          have made <b>significant positive</b> changes to their lives.
        </>
      ),
    },
  ];

  const rightHeadings = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Become a better caregiver",
    "Improve your mood",
    "Maximize your abilities",
  ];

  const rightStats = [
    {
      number: "91%",
      text: (
        <>
          of Summarist members <b>report feeling more productive</b> after
          incorporating the service into their daily routine.
        </>
      ),
    },
    {
      number: "94%",
      text: (
        <>
          of Summarist members have <b>noticed an improvement</b> in their
          overall comprehension and retention of information.
        </>
      ),
    },
    {
      number: "88%",
      text: (
        <>
          of Summarist members <b>feel more informed</b> about current events
          and industry trends since using the platform.
        </>
      ),
    },
  ];

  return (
    <section id="statistics">
      <div className="container">
        <div className="row">
          <div className="statistics__wrapper">
            <div className="statistics__content--header">
              {leftHeadings.map((heading) => (
                <div key={heading} className="statistics__heading">
                  {heading}
                </div>
              ))}
            </div>

            <div className="statistics__content--details">
              {leftStats.map((stat) => (
                <div key={stat.number} className="statistics__data">
                  <div className="statistics__data--number">
                    {stat.number}
                  </div>

                  <div className="statistics__data--title">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="statistics__wrapper">
            <div className="statistics__content--details statistics__content--details-second">
              {rightStats.map((stat) => (
                <div key={stat.number} className="statistics__data">
                  <div className="statistics__data--number">
                    {stat.number}
                  </div>

                  <div className="statistics__data--title">{stat.text}</div>
                </div>
              ))}
            </div>

            <div className="statistics__content--header statistics__content--header-second">
              {rightHeadings.map((heading) => (
                <div key={heading} className="statistics__heading">
                  {heading}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}