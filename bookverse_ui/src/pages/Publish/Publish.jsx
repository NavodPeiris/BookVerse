import React, { useState } from "react";
import './Publish.css';
import { book_pub_buy_link } from "../../backend_links";
import axios from "axios";

const Publish = () => {
  const [first_publish_year, setFirstPubYear] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [cover_image_available, setCoverImageAvailable] = useState(false);
  const [authors, setAuthors] = useState("");
  const [subjects, setSubjects] = useState("");
  const [subject_places, setSubjectPlaces] = useState("");
  const [subject_times, setSubjectTimes] = useState("");
  const [description, setDescription] = useState("");
  const [edition_count, setEditionCount] = useState(1);
  const [price, setPrice] = useState("");
  const [doc, setDoc] = useState(null);
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const token = localStorage.getItem('access_token');

  const handlePublish = async () => {

    if(!(doc)){
      alert("Please upload both book PDF");
    }

    if(cover_image_available && !img){
      alert("Please upload cover image");
    }

    // Split and trim by comma
    const authorsArray = authors.split(',').map(s => s.trim()).filter(Boolean);
    const subjectsArray = subjects.split(',').map(s => s.trim()).filter(Boolean);

    console.log(authorsArray)
    console.log(subjectsArray)

    const formData = new FormData();
    formData.append("first_publish_year", first_publish_year);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("cover_image_available", cover_image_available);
    formData.append("authors", authorsArray);
    formData.append("subjects", subjectsArray);
    formData.append("subject_places", subject_places);
    formData.append("subject_times", subject_times);
    formData.append("description", description);
    formData.append("edition_count", edition_count);
    formData.append("price", price);
    formData.append("doc", doc);
    formData.append("img", img);

    try {
      await axios.post(`${book_pub_buy_link}/publish`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Published successfully!");
    } catch (error) {
      console.error("Error publishing the book:", error);
      alert("Error publishing the book.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImgPreview(URL.createObjectURL(file));
  };

  return (
    <section className="about">
      <div className="container">
        <div className="section-title">
          <h2>Publish</h2>
        </div>

        <div>
          <form className="publish-form" onSubmit={(e) => { e.preventDefault(); handlePublish(); }}>
            <div className="form-field">
              <label>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="form-field">
              <label>Subtitle</label>
              <input type="text" value={subtitle} onChange={e => setSubTitle(e.target.value)} />
            </div>

            <div className="form-field">
              <label>First Publish Year</label>
              <input type="number" value={first_publish_year} onChange={e => setFirstPubYear(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Authors (comma separated)</label>
              <input type="text" value={authors} onChange={e => setAuthors(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Subjects</label>
              <input type="text" value={subjects} onChange={e => setSubjects(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Subject Places</label>
              <input type="text" value={subject_places} onChange={e => setSubjectPlaces(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Subject Times</label>
              <input type="text" value={subject_times} onChange={e => setSubjectTimes(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Edition Count</label>
              <input type="number" value={edition_count} onChange={e => setEditionCount(e.target.value)} />
            </div>

            <div className="form-field">
              <label>Price (USD)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <div className="form-field checkbox-field">
              <label>
                <input type="checkbox" checked={cover_image_available} onChange={e => setCoverImageAvailable(e.target.checked)} style={{ marginRight: '8px' }}/>
                Cover Image Available
              </label>
            </div>

            <div className="form-field">
              <label>Upload Document (PDF/DOCX)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setDoc(e.target.files[0])} />
            </div>

            <div className="form-field">
              <label>Upload Cover Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imgPreview && <img src={imgPreview} alt="Preview" width="100" />}
            </div>

            <button type="submit" className="publish-btn">Publish</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Publish;
