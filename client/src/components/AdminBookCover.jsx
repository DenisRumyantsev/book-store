import React from 'react';
import { styles } from '../styles/styles';

const AdminBookCover = (bookProps) => {
    const { book, cover, setCover, coverDeleted, setCoverDeleted, currentIsbn } = bookProps;

    const handleUploadCover = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setCover(reader.result);
        reader.readAsDataURL(file);
    };

    function coverImage () {
        if (cover) {
            return <img src={cover} alt="book cover" style={styles.image}/>;
        }
        if (currentIsbn && book.coverExists) {
            return <img src={`/static/${currentIsbn}.jpg`} alt="book cover" style={coverDeleted ? styles.imageMuted : styles.image}/>;
        }
        return <>No file chosen</>;
    }

    const deleteBtn = <a
        onClick={() => setCoverDeleted(!coverDeleted)}
        class={`${coverDeleted ? styles.btnWavesDarken : styles.btnWavesOrange}${cover | !book.coverExists ? ' disabled' : ''}`}
        style={coverDeleted ? styles.btnR1red : styles.btnR1}>
        {coverDeleted ? <>restore</> : <>remove</>}
        <i class="material-icons right">{coverDeleted ? <>restore</> : <>delete_forever</>}</i>
    </a>;

    return (
        <div class="col s12 m3">
            <div class="card z-depth-5" style={styles.card}>
                <center><h4 style={styles.bold}>Book Cover</h4></center>
                <div class="row">
                    <div class="col s10">
                        <div class="input-field file-field">
                            <input key={Math.random()} onChange={handleUploadCover} title=" " type="file"/>
                            <i class="material-icons prefix" style={styles.red}>file_upload</i>
                            <input value={cover ? 'Uploaded successfully' : 'Click here to upload . . .'} disabled type="text" style={styles.boldRed}/>
                        </div>
                    </div>
                    <i onClick={() => setCover('')} class="material-icons" style={styles.btnIcon}>clear</i>
                </div>
                <center>{coverImage()}</center>
                {currentIsbn && deleteBtn}
            </div>
        </div>
    );
};

export default AdminBookCover;
