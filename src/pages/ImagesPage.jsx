import React, { useState, useMemo } from 'react';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import ImageDetailPanel from '../components/ImageDetailPanel';
import { images, interventionTypes, imageLocations } from '../data/mockData';
import './ImagesPage.css';

const ALL = 'All';

export default function ImagesPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [locationFilter, setLocationFilter] = useState(ALL);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return images.filter((image) => {
      const matchesSearch =
        !query ||
        image.interventionType.toLowerCase().includes(query) ||
        image.location.toLowerCase().includes(query);
      const matchesType = typeFilter === ALL || image.interventionType === typeFilter;
      const matchesLocation = locationFilter === ALL || image.location === locationFilter;
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [search, typeFilter, locationFilter]);

  return (
    <div className="images-page">
      <section className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Geo-Coded Images</h1>
          <p className="page-subtitle">Field captures from monitored watershed interventions</p>
        </div>
      </section>

      <section className="images-filters">
        <input
          type="text"
          className="images-search"
          placeholder="Search by intervention or village..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className="control-field">
          <span className="control-label">Intervention type</span>
          <select className="control-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value={ALL}>All types</option>
            {interventionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className="control-field">
          <span className="control-label">Village</span>
          <select className="control-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value={ALL}>All villages</option>
            {imageLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
      </section>

      {filteredImages.length === 0 ? (
        <p className="images-empty">No images match your filters.</p>
      ) : (
        <section className="images-grid-page">
          {filteredImages.map((image) => (
            <ImageCard key={image.id} image={image} onViewDetails={setSelectedImage} />
          ))}
        </section>
      )}

      {selectedImage && (
        <Modal title="Image Details" onClose={() => setSelectedImage(null)}>
          <ImageDetailPanel image={selectedImage} />
        </Modal>
      )}
    </div>
  );
}
