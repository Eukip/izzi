// import { useDispatch, useSelector } from "react-redux";
import React from "react";
// import { fetchAboutMap } from "../../store/actions/aboutMap";
import { Map, Placemark, YMaps } from "react-yandex-maps";


const ContactPageMap = (mapItems) => {
    const markers = [
        {
            coords: [43.054237, 74.469069],
            content: "Manas International Airport",
            number: "+996 505 06 86 96",
        },
        {
            coords: [42.8207938, 74.6167546],
            content: "Jannat Regency, Aaly Tokombaeva 21/2 str.",
            number: "+996 505 06 86 96",
        },
        {
            coords: [42.666014, 74.684017],
            content: "Jannat Resort, Koy-Tash vlg.",
            number: "+996 505 06 86 96",
        },
    ];
    const styles = {
        width: "100%",
        height: "100%",
        style: "border:0",
        allowfullscreen: "",
        loading: "lazy",
    };
  return (
      // <div className="map">
      <>
          <YMaps style={styles}>
              <div style={styles}>
                  <Map
                      style={styles}
                      defaultState={{
                          center: [42.87, 74.59],
                          zoom: 9,
                      }}
                  >
                      {markers.map((item) => {
                          return (
                              <Placemark
                                  style={styles}
                                  modules={[
                                      "geoObject.addon.balloon",
                                  ]}
                                  defaultGeometry={
                                      item.coords
                                  }
                              />
                          );
                      })}
                  </Map>
              </div>
          </YMaps>
        {/*<YMaps style={styles}>*/}
        {/*  <div style={styles}>*/}
        {/*    <Map*/}
        {/*        style={styles}*/}
        {/*        defaultState={{*/}
        {/*          center: [42.87, 74.59],*/}
        {/*          zoom: 9,*/}
        {/*        }}*/}
        {/*    >*/}
        {/*      {mapItems.mapItems.map((item) => {*/}

        {/*        return (*/}
        {/*            <Placemark*/}
        {/*                style={styles}*/}
        {/*                modules={[*/}
        {/*                  "geoObject.addon.balloon",*/}
        {/*                ]}*/}
        {/*                defaultGeometry={*/}
        {/*                  item.coordinates*/}
        {/*                }*/}
        {/*            />*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </Map>*/}
        {/*  </div>*/}
        {/*</YMaps>*/}
        {/*{mapItems.mapItems.map(item => (*/}
        {/*    <li>{item.coordinates}</li>*/}
        {/*))}*/}
    {/*</div>*/}
      </>
  );
};

export default ContactPageMap;
