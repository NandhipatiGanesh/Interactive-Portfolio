import styles from './apple-features.module.scss';

export default function AppleFeatures() {
    return (
        <div className={styles.container}>
            <div className={styles.control}>
                <details className={styles.control__item} name="control" open={true}>
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Finishes
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Finishes.</strong> Choose from two aerospace-grade titanium finishes — natural and black. Ultra&nbsp;3
                                shown in&nbsp;<span className={styles.colorCurrent}>Natural</span>.</p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Display
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Display.</strong> Wide-angle OLEDs make the display brighter when viewed at an angle. Power-efficient
                                LTPO3 technology allows you to see ticking seconds on watch faces.</p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Battery
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Battery.</strong> Get a big boost in battery life with up to 42 hours of normal use and up to 72 hours in
                                Low Power Mode.</p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Durability
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Durability.</strong> Ultra&nbsp;3 is built to last with a rugged titanium case and a display crafted from
                                sapphire crystal — one of the strongest naturally occurring materials on Earth.</p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Water and dust resistance
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Water and dust resistance.</strong> Ultra&nbsp;3 is rated WR100 — fit for recreational scuba diving to
                                40&nbsp;meters and high-speed water sports.
                                It's also IP6X dust resistant.<sup data-footnote="numbered-dust-resistance" className="footnote footnote-number"></sup></p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Action button
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Action button.</strong> One quick press gives you precise, physical control over a variety of
                                customizable functions — like starting a workout, marking a segment, or turning on the flashlight.</p>
                        </div>
                    </div>
                </details>
                <details className={styles.control__item} name="control">
                    <summary className={styles.control__label}>
                        <svg className={`${styles.control__icon} icon`}>
                            <use href="#icon-plus"></use>
                        </svg>
                        Bands
                    </summary>
                    <div className={styles.control__body}>
                        <div className={styles.control__text}>
                            <p><strong>Bands.</strong> Ultra&nbsp;3 has four beautiful, endlessly versatile band styles that meet the demands of
                                your daily activities, from workouts to nights&nbsp;out.</p>
                        </div>
                    </div>
                </details>
            </div>
            <div className={styles.imageContainer}>
                <img
                    src="/applewatch.png"
                    alt="Apple Watch Ultra 2 Black Titanium"
                    loading="lazy"
                />
            </div>

            <svg width="0" height="0" className={styles.displayNone}>
                <symbol id="icon-plus" width="24" height="24" viewBox="0 0 24 24" >
                    <circle cx="12" cy="12" r="11.3" fill="none" stroke="currentColor" />
                    <path stroke="none" fill="currentColor" d="m16 11h-3v-3c0-.553-.447-1-1-1s-1 .447-1 1v3h-3c-.553 0-1 .447-1 1s.447 1 1 1h3v3c0 .553.447 1 1 1s1-.447 1-1v-3h3c.553 0 1-.447 1-1s-.447-1-1-1" />
                </symbol>
            </svg>

        </div>
    )
}
