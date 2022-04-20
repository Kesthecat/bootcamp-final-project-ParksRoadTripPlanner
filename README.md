# bootcamp-final-project-ParksRoadTripPlanner

Minor issues: 

-Some components are pretty clean while other's... well I hope you like spaghetti.... i can eventually makes these big components smaller. 

-Google Map rezooming when adding/removing waypoints is a little annoying... would like to set a condition so it doesn't happen with waypoints. 

-adding some park pins results in error message BECAUSE i saved the wrong coordinates while getting raw data: got the coordinates in the middle of the park where there is no road to get to so of course it cannot give a direction.... i caould have solve it with a proper validation in the FE until i get the right coordinates.... but for now, just avoid those parks... oups....

-i'm having difficult with the proper pin modal stacking.... park markers have a z-index of -5 and the modal has a z-index of 1000 and yet some markers are still over the modal.... I tried using mui's Popover but it would appear and keep flashing quickly (can't even click it) so having a proper stacking is also something i woudl like to fix..... (This issue was dealt with an instructor but we still cannot fix it....)

comments: Google Map API is soo much harder than anticipated.... 

Thank you again!
