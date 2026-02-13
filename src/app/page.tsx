"use client"


import { useState, useEffect } from 'react';
import Image from "next/image";

import styles from "./page.module.css";
import presentations from "./data/presentations.json";
import axios from "axios";

interface Presentation {
  question: string;
  correct_answer: string;
  category: string;
  url: string;
}

interface Answer {
  questionNumber?: number;
  choice?: string;
}


function HomePage() {

  const [presentation, setPresentation] = useState<Presentation[]>([]);
  const [category, setCategory] = useState("Untitled Presentation");
  const [answer, setAnswer] = useState<Answer>({});

  async function getSlides(url: string) {
    try {
      const response = await axios.get<{ results: Presentation[] }>(url);
      console.log(response.data.results);
      setPresentation(response.data.results);
      if (response.data.results && response.data.results.length > 0) {
        setCategory(response.data.results[0]?.category ?? "Untitled Presentation");
      }
    } catch (error) {
      console.error(error);
    }
  }


  function decodeHtml(str = "") {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }


  function handleAnswerClick(questionNumber: number, choice: string) {
    setAnswer({ questionNumber, choice })
    console.log(answer);
  }


  useEffect(() => {
    const chosen = presentations[Math.floor(Math.random() * presentations.length)];
    if (chosen) {
      void getSlides(chosen.url);
    }
  }, []);

  function handleSlideClick(index: number) {
    const el = document.getElementById(String(index));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }


  return (
    <>
      <div className={styles.mainBody}>
        <div className={styles.header}>
          <div className={styles.topLeft}>
            <div
              className={styles.logo}
              style={{ backgroundImage: "url(/assets/slides.png)" }}
            >
            </div>

            <div
              className={styles.text}>
              <div
                style={{ color: '#444746' }}>
                {category} Quiz
              </div>

              <div className={styles.options}>
                <p className={styles.optionsText}> File</p>
                <p className={styles.optionsText}> Edit</p>
                <p className={styles.optionsText}> View</p>
                <p className={styles.optionsText}> Insert</p>
                <p className={styles.optionsText}> Format</p>
                <p className={styles.optionsText}> Slide</p>
                <p className={styles.optionsText}> Arrange</p>
                <p className={styles.optionsText}> Tools</p>
                <p className={styles.optionsText}> Extensions</p>
                <p className={styles.optionsText}> Help</p>
              </div>
            </div>


          </div>


          <div className={styles.topRight}>
            <div className={styles.rightIcons}
              style={{ backgroundImage: "url(/assets/history.png)" }}></div>

            <div className={styles.rightIcons}
              style={{ backgroundImage: "url(/assets/comment.png)" }}></div>

            <div
              style={{ border: 'solid 1px #444746', padding: '10px 20px', borderRadius: '20px', color: '#444746', fontSize: '0.9em', fontWeight: 'bolder' }}
            >
              Slideshow
            </div>

            <div
              style={{ background: '#C2E7FF', padding: '10px 20px', borderRadius: '20px', color: '#444746', fontSize: '0.9em', fontWeight: 'bolder' }}
            >
              <div
                style={{ backgroundImage: "url(/assets/lock.png)", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '110%', width: '17px', height: '17px', display: 'inline-block', verticalAlign: 'middle', marginRight: '3px' }}>
              </div>

              <span>Share</span>
            </div>

            <div className={styles.rightIcons}
              style={{ backgroundImage: "url(/assets/wand.png)" }}></div>


            <div className={styles.profile}>A</div>

          </div>

        </div>

        <div className={styles.toolBar}>
          <div
            style={{ backgroundColor: '#ffffff', width: '60px', display: 'flex', alignItems: 'center', gap: "7px", borderRadius: '20px', padding: '3px 6px 3px 6px' }}
          >
            <Image src="/assets/search_100.png" width={12} height={12} alt="search icon" />

            <div style={{ color: '#444746', fontSize: '0.65em' }}>Menus</div>
          </div>

          <Image src="/assets/plus.png" width={16} height={16} alt="plus icon" />
          <Image src="/assets/down.png" width={16} height={16} alt="down arrow" />

          <div className={styles.bars}> | </div>


          <Image src="/assets/undo.png" width={16} height={16} alt="undo icon" />
          <Image src="/assets/redo.png" width={16} height={16} alt="redo icon" />
          <Image src="/assets/print.png" width={16} height={16} alt="print icon" />
          <Image src="/assets/paint.png" width={16} height={16} alt="paint icon" />

          <Image src="/assets/zoom.png" width={16} height={16} alt="zoom icon" />
          <div style={{ color: '#444746', fontSize: '0.78em' }}>104%</div>
          <Image src="/assets/down.png" width={16} height={16} alt="down arrow" />
          <div style={{ color: '#444746', fontSize: '0.78em' }}> | </div>

          <Image src="/assets/mouse.png" width={16} height={16} alt="mouse icon" />
          <Image src="/assets/text.png" width={16} height={16} alt="text icon" />
          <Image src="/assets/shapes.png" width={16} height={16} alt="shapes icon" />
          <Image src="/assets/line.png" width={16} height={16} alt="line icon" />
          <Image src="/assets/down.png" width={16} height={16} alt="down arrow" />

          <div style={{ color: '#444746', fontSize: '0.78em' }}> | </div>
          <Image src="/assets/add_comment.png" width={16} height={16} alt="add comment icon" />

          <div className={styles.bars}> | </div>

          <div className={styles.textSection}> Background </div>

          <div className={styles.bars}> | </div>

          <div className={styles.textSection}> Layout </div>

          <div className={styles.bars}> | </div>

          <div className={styles.textSection}> Theme </div>

          <div className={styles.bars}> | </div>

          <div className={styles.textSection}> Transition </div>


        </div>

        <div className={styles.body}>
          {/* Left*/}
          <div className={styles.rightBody}>
            {presentation.map((each, index) => (
              <div
                key={index}
                className={styles.slideThumbnailBox}
                onClick={() => handleSlideClick(index)}>
                <div className={styles.slideNumber}> {index + 1} </div>
                <button className={styles.slideThumbnail}>
                  <div className={styles.slideThumbnailTitle}> Question {index + 1} </div>
                  <div className={styles.slideThumbnailBody}> {decodeHtml(each.question)} </div>
                </button>
              </div>
            ))}
          </div>


          {/* Right*/}
          <div className={styles.rightBody}>
            {presentation.map((each, index) => (
              <div
                key={index}
                id={String(index)}
                className={styles.slideCanvas}>
                <div className={styles.slideTitle}> Question {index + 1} </div>
                <div className={styles.slideBody}> {decodeHtml(each.question)} </div>
                <div className={styles.answerSection}>
                  {["True", "False"].map((option) => {
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswerClick(index, option)}
                        className={styles.answerButton}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div>
                  user clicked {answer.choice} for question {answer.questionNumber}
                </div>
                <div> The correct answer is {each.correct_answer}</div>
              </div>

            ))}


          </div>
        </div>

      </div >
    </>
  )

}

export default HomePage