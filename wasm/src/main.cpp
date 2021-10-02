#include <iostream>
#include <emscripten/bind.h>

#include "libastro/astro.h"
#include "libastro/preferences.h"
using namespace emscripten;

std::string hello() {
  return "hello sprocket spaceapps";
}

float tleToObj()//char *arr[])
{
  Now now, *np = &now; /* Now and handy pointer */
  Obj obj, *op = &obj; /* Obj and handy pointer */
	memset(op, 0, sizeof(*op));				/* zero everything initially */

  char *l0 = "ISS";
  char *l1 = "1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927";
  char *l2 = "2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537";
  db_tle(l0, l1, l2,op);

	/* define local circumstances */

	memset(np, 0, sizeof(*np));						/* zero everything initially */
	cal_mjd(10, 2.5, 2021, &mjd);					/* mjd from calendar date and time */
	lat = degrad(44.71);										/* latitude, +n rads */
	lng = degrad(17.33);									/* longitude, +e rads */
	tz = -5;															/* time zone, hrs behind UTC */
	temp = 10;														/* ambient air temp, C */
	pressure = 900;												/* ambient air pressure, mBar */
	elev = 100 / ERAD;										/* local height above MSL, earth equatorial radii */
	dip = degrad(18);											/* sun horizon altitude at twilight, rads down */
	epoch = J2000;												/* time of computed coords, MJD or EOD */
	pref_set(PREF_EQUATORIAL, PREF_TOPO); /* set topocentric place, else GEO */

	/* define target object, example star */

	// op->o_type = FIXED;								/* fixed, except possibly for proper motion */
	// op->f_RA = hrrad(1.0);						/* RA, rads */
	// op->f_dec = degrad(20.0);					/* dec, +n rads */
	// op->f_epoch = J2000;							/* coord system */
	// (void)strcpy(op->o_name, "Star"); /* name */
	(void)obj_earthsat(np, op);						/* compute position @ now */
	//reportPosition(np, op);						/* print */

	/* define target object, example Moon */

  printf("%9.6f \n", obj.es.ess_sublat);
  // printf("%s \n",obj.es.co_age);

  return obj.es.ess_sublat;
}

// Expose functions to the outside world
EMSCRIPTEN_BINDINGS(my_module) {
//function(function_javascript_name, function_reference)
  function("hello", &hello);
  function("tleToObj", &tleToObj);
}
