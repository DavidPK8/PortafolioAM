import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude
  address: string = ''; // initial value

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private firestore: AngularFirestore
  ) {}

  // geolocation options
  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600,
  };

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation
      .getCurrentPosition(this.options)
      .then((resp) => {
        console.log(resp);
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  // geocoder options
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  // get address using coordinates
  getAddress(lat: any, long: any) {
    this.nativeGeocoder
      .reverseGeocode(lat, long, this.nativeGeocoderOptions)
      .then((res: NativeGeocoderResult[]) => {
        this.address = this.pretifyAddress(res[0]);
        this.saveLocation(lat, long, this.address);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  // format address
  pretifyAddress(address: any) {
    let obj = [];
    let data = '';
    for (let key in address) {
      if (address[key].length) {
        obj.push(address[key]);
      }
    }
    obj.reverse();
    for (let val in obj) {
      data += obj[val] + ', ';
    }
    return data.slice(0, -2); // remove last comma and space
  }

  // save location to Firestore
  saveLocation(latitude: any, longitude: any, address: string) {
    const locationData = {
      latitude: latitude,
      longitude: longitude,
      address: address,
      timestamp: new Date(),
    };
    this.firestore.collection('locations').add(locationData)
      .then((docRef: any) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error: any) => {
        console.error("Error adding document: ", error);
      });
  }
}