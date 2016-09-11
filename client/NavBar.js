import React, { Component } from 'react';
import {
} from 'react-native';

class NavBar extends Navigator.NavigationBar{
	return(
		var routes = this.props.navState.routeStack;

	    if (routes.length) {
	      var route = routes[routes.length - 1];

	      if (route.display === false) {
	        return null;
	      }
	    }

	    return super.render();
	)
}