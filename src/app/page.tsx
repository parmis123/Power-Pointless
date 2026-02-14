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
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});


  async function getSlides(url: string) {
    try {
      const response = await axios.get<{ results: Presentation[] }>(url);
      console.log(response.data.results);
      setPresentation(response.data.results);
      setAnswers({});
      if (response.data.results && response.data.results.length > 0) {
        setCategory(response.data.results[0]?.category ?? "Untitled Presentation");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function decodeHtml(str = "") {
    return str
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&ntilde;/g, "ñ")
      .replace(/&nbsp;/g, " ");
  }



  function handleAnswerClick(questionNumber: number, choice: string) {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: choice
    }));


  }


  useEffect(() => {
    void getSlides(presentations[0]?.url ?? "");
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
                {decodeHtml(category)} Quiz
              </div>

              <div className={styles.options}>
                <p className={styles.optionsText}
                  style={{ cursor: 'pointer' }}
                  onMouseOver={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = "#E8E8E8";
                  }}
                  onMouseOut={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.backgroundColor = "transparent";
                  }}
                  onClick={() => setFileMenuOpen((open) => !open)}
                > File</p>
                {
                  fileMenuOpen && (
                    <>
                      <div
                        className={styles.fileMenu}
                      >
                        {presentations.map((each, index) => (

                          <div
                            key={index}
                            className={styles.fileMenuOption}
                            onMouseOver={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.backgroundColor = "#E8E8E8";
                            }}
                            onMouseOut={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.backgroundColor = "transparent";
                            }}
                            onClick={() => {
                              void getSlides(each.url);
                              setFileMenuOpen(false);
                            }}
                          >
                            <Image src={each.image} width={20} height={20} alt={`${each.title} icon`} />
                            {decodeHtml(each.title)}

                          </div>

                        ))}

                      </div>

                    </>
                  )
                }
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
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {["True", "False"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleAnswerClick(index, option)}
                        className={styles.answerButton}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Feedback on next line */}
                  {answers[index] && (
                    <div className={styles.result} style={{
                      backgroundColor: answers[index] === each.correct_answer ? '#d4edda' : '#f8d7da',
                      color: answers[index] === each.correct_answer ? '#155724' : '#721c24',
                    }}>
                      {answers[index] === each.correct_answer ? (
                        <>Correct!</>
                      ) : (
                        <>Incorrect.</>
                      )}
                    </div>
                  )}
                </div>

              </div>

            ))}


          </div>
        </div>

      </div >
    </>
  )

}

export default HomePage