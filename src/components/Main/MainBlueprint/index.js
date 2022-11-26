import React from 'react';
import styles from './mainBluprint.module.scss'
import logo from "./img/blueprint_logo.svg"
import sketch from "./img/blueprint_sketch.svg"
import sketchMob from "./img/blueprint_sketch_mob.svg"

const MainBlueprint = () => {
    return (
        <div className={styles.main_blueprint}>
            <img src={logo} className={styles.main_blueprint_logo} alt=""/>
            <img src={sketch} className={`${styles.main_blueprint_sketch} ${styles.pc}`} alt=""/>
            <img src={sketchMob} className={`${styles.main_blueprint_sketch} ${styles.mob}`} alt=""/>
        </div>
    );
};

export default MainBlueprint;