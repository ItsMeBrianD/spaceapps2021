#include <iostream>
#include <emscripten/bind.h>
#include <ctime>

#include "libastro/astro.h"
#include "libastro/preferences.h"
using namespace emscripten;

std::string hello() {
  return "hello sprocket spaceapps";
}
static void
reportPosition(Now *np, Obj *op)
{
  int mon, year;
  double day;
  char sexa[32];

  printf("Circumstances:\n");
  mjd_cal(mjd, &mon, &day, &year);
  printf("UTC:       %d/%g/%d\n", mon, day, year);
  fs_sexa(sexa, raddeg(lat), 3, 3600);
  printf("Latitude:  %s D:M:S +N\n", sexa);
  fs_sexa(sexa, raddeg(lng), 3, 3600);
  printf("Longitude: %s D:M:S +E\n", sexa);
  printf("\n");

  printf("%s:\n", op->o_name);
  fs_sexa(sexa, radhr(op->s_ra), 3, 3600);
  printf("RA:        %s H:M:S\n", sexa);
  fs_sexa(sexa, raddeg(op->s_dec), 3, 3600);
  printf("Dec:       %s D:M:S\n", sexa);
  fs_sexa(sexa, raddeg(op->s_alt), 3, 3600);
  printf("Altitude:  %s D:M:S\n", sexa);
  fs_sexa(sexa, raddeg(op->s_az), 3, 3600);
  printf("Azimuth:   %s D:M:S\n", sexa);
  printf("\n");

  printf("\n");
}

float tleToObj()//char *l1, char *l2)//char *arr[])
{

  time_t t = time(0);
  struct tm * timeStruct = gmtime(&t);
  int year = timeStruct->tm_year + 1900;
  int month = timeStruct->tm_mon + 1;
  float day = timeStruct->tm_mday + (timeStruct->tm_hour/24.0) + (timeStruct->tm_min/(60.0*24.0)) + (timeStruct->tm_sec/(60.0*60.0*24.0));

  Now now, *np = &now; /* Now and handy pointer */
  Obj obj, *op = &obj; /* Obj and handy pointer */
	memset(op, 0, sizeof(*op));				/* zero everything initially */

  char *l0 = "ISS";
  char *l1 = "1 25544U 98067A   21275.52277778  .00006056  00000-0  11838-3 0  9993";
  char *l2 = "2 25544  51.6451 172.0044 0004138  50.9000 316.9051 15.48905523305232";

  db_tle(l0, l1, l2,op);

	/* define local circumstances */

	memset(np, 0, sizeof(*np));						/* zero everything initially */
	cal_mjd(month, day, year, &mjd);					/* mjd from calendar date and time */
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
	// reportPosition(np, op);						/* print */

	/* define target object, example Moon */

  printf("hello\n");
  printf("%f\n", raddeg(obj.es.ess_sublat));
  printf("%f\n", raddeg(obj.es.ess_sublng));
}

void printBuffer(uintptr_t pr, int length){
  const char *ptr = reinterpret_cast<char *>(pr);
  printf("Hello? \n");
  //std::cout << "pr" << ptr << " length" << length << std::endl;
  for (int i = 0; i < length; i++)
  {
    std::cout << ptr[i];
  }
  std::cout << std::endl;
}

// Expose functions to the outside world
EMSCRIPTEN_BINDINGS(my_module) {
//function(function_javascript_name, function_reference)
  function("hello", &hello);
  function("tleToObj", &tleToObj, allow_raw_pointers());
  function("printBuffer", &printBuffer, allow_raw_pointers());
}
