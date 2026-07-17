import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

export default function Numbers() {

    const numbers = [
  {
    icon: <BiCrown />,
    title: "3 Million",
    subtitle: "Downloads on all platforms",
  },
  {
    icon: (
      <>
        <BsStarFill />
        <BsStarHalf />
      </>
    ),
    title: "4.5 Stars",
    subtitle: "Average ratings on iOS and Google Play",
    iconClass: "numbers__star--icon",
  },
  {
    icon: <RiLeafLine />,
    title: "97%",
    subtitle: "Of Summarist members create a better reading habit",
  },
];
    return(
    <section id="numbers">
      <div className="container">
        <div className="row">
          <div className="section__title">Start growing with Summarist now</div>

        <div className="numbers__wrapper">
  {numbers.map((number) => (
    <div key={number.title} className="numbers">
      <div
        className={`numbers__icon${number.iconClass ? ` ${number.iconClass}` : ""}`}
        >
        {number.icon}
      </div>

      <div className="numbers__title">
        {number.title}
      </div>

      <div className="numbers__sub--title">
        {number.subtitle}
      </div>
    </div>
  ))}
    </div>
  </div>
 </div>
</section>

    )
}