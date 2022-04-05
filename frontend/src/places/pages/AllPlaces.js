import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import Pagination from '../../shared/components/UIElements/Pagination';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const AllPlaces = () => {
  const pageId = parseInt(useParams().pageId);
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`/api/places/all/${pageId}`);
        console.log('responseData: ', responseData);
        setCount(responseData.count);
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, pageId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <>
          <PlaceList
            displayCreator={true}
            items={loadedPlaces}
            onDeletePlace={placeDeletedHandler}
          />
          <Pagination
            count={count}
            currentPage={currentPage}
            displayedPerPage={loadedPlaces.length}
            linkPartial={'/places/all'}
            totalPages={totalPages}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default AllPlaces;
