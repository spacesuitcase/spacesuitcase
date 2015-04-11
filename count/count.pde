/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
 
  This example code is in the public domain.
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it a name:
//int led = 13;

// the setup routine runs once when you press reset:

int PIN8  = 8; // SRCLR
int PIN11 = 11; // SER IN
int PIN12 = 12; // RCK

void setup() {                
  // initialize the digital pin as an output.
  //pinMode(led, OUTPUT);     

    pinMode( PIN8, OUTPUT );
    pinMode( PIN11, OUTPUT );
    pinMode( PIN12, OUTPUT );
	
    Serial.begin(9600);           // set up Serial library at 9600 bps
    Serial.println("Hello world!"); 
}


void shift_this( int x ) {
    Serial.println(x);
    shiftOut(PIN11, PIN12, MSBFIRST, x); 
    shiftOut(PIN11, PIN8, MSBFIRST, x); 
}


int dec_to_led[10]  = { 119, 20, 179, 182, 212, 230, 231, 52, 247, 246 };

// the loop routine runs over and over again forever:
void loop() {
    //digitalWrite(led, HIGH);   // turn the LED on (HIGH is the voltage level)
    //delay(1000);               // wait for a second
    //digitalWrite(led, LOW);    // turn the LED off by making the voltage LOW
    //delay(1000);               // wait for a second
    int i;
    for(i=10; i>-1; i--) {

	shift_this( dec_to_led[i] );
	delay(1000);
	
    }

    
}
