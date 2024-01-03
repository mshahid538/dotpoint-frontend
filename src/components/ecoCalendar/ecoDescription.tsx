import React, { useRef, useState } from "react";
import PaperContainer from "@components/common/PaperContainer";

interface TradaysWidget {
  init(options: WidgetOptions): void;
  // Add any other properties or methods you may use
}

interface WidgetOptions {
  container: string;
  width?: string;
  height?: string;
  mode?: any;
  theme?: string;
}

const DescriptionTable = ({ calendarPeriod, forceRerender, calendarThemeDark }: any) => {
  const widgetContainerRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const existingScript: any = document.getElementById('economicCalendarWidgetScript');
    console.log(existingScript, "existingScript");

    // Ensure the widget container is available
    if (widgetContainerRef.current) {
      if (existingScript) {
        // Update the existing script attributes
        existingScript.setAttribute('data-type', 'calendar-widget');
        existingScript.src = 'https://www.tradays.com/c/js/widgets/calendar/widget.js?v=13';

        // Set the widget options
        const options: WidgetOptions = {
          container: 'economicCalendarWidget',
          width: '100%',
          height: '400px',
          mode: calendarPeriod,
          theme: calendarThemeDark === "Dark" ? "1" : "2",
        };

        // Convert options object to JSON and set it as innerHTML
        existingScript.innerHTML = JSON.stringify(options);

        // Reinitialize the widget after updating the script
        initializeWidget();
      } else {
        // Create a new script if it doesn't exist
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.id = 'economicCalendarWidgetScript';
        script.setAttribute('data-type', 'calendar-widget');
        script.src = 'https://www.tradays.com/c/js/widgets/calendar/widget.js?v=13';

        // Set the widget options
        const options: WidgetOptions = {
          container: 'economicCalendarWidget',
          width: '100%',
          height: '400px',
          mode: calendarPeriod,
          theme: calendarThemeDark === "Dark" ? "1" : "2",
        };

        // Convert options object to JSON and set it as innerHTML
        script.innerHTML = JSON.stringify(options);

        // Append the script to the document body
        document.body.appendChild(script);
        console.log(script, "scriptscriptscriptF")
        // Reinitialize the widget after adding the new script
        initializeWidget();
      }
    }
  }, [calendarPeriod, forceRerender, calendarThemeDark]);

  // Function to initialize the widget
  const initializeWidget = () => {
    // Assuming TradaysWidget is the global object provided by the Tradays script
    if ((window as any).TradaysWidget) {
      const tradaysWidget: TradaysWidget = (window as any).TradaysWidget;

      // Replace 'economicCalendarWidget' with the ID of the container element
      tradaysWidget.init({ container: 'economicCalendarWidget' });
    }
  };


  return (
    <>
      {/* <PaperContainer bodyPadding={"0px"}> */}
      <div ref={widgetContainerRef} id="economicCalendarWidget"></div>
      {/* </PaperContainer> */}
    </>
  );
};

export default DescriptionTable;


