# Data Visualization Project

## Data

The data I propose to visualize for my project is ...


## Questions & Tasks

The following tasks and questions will drive the visualization and interaction decisions for this project:

1). How does temperature vary over time?    
    We can use the line chart (Temperature over Time) to visualize the changes in average temperature across different months. This can help identify seasonal trends and extreme temperature events.  
    Interaction: When users hover over a point in the line chart (Temperature over Time), highlight the corresponding month in the bar chart (Area Burned by Month) and show the average relative humidity in the 
    scatter plot (Temperature vs. Relative Humidity) for that month.
  
2). Is there a correlation between temperature and relative humidity?    
    The scatter plot (Temperature vs. Relative Humidity) can be used to explore the relationship between temperature and relative humidity. By analyzing the distribution of data points, you can determine if 
    there's a negative or positive correlation between these two variables.  
    Interaction: When users hover over a point in the scatter plot (Temperature vs. Relative Humidity), highlight the corresponding data in the line chart (Temperature over Time) and the bar chart (Area Burned by 
    Month) to see how the temperature and relative humidity in that data point relate to the overall trends and fire occurrences.
    
3). Are there interesting spatial patterns in the occurrence of fires?  
    We can use the X and Y coordinates in the dataset to create a heat map or spatial distribution plot. This visualization can help identify areas with a higher frequency of fires and any patterns related to 
    the location of fires within the park or forest.  
    Interaction: For the heat map or spatial distribution plot created using the X and Y coordinates, hovering over a specific area can highlight the corresponding data in the other charts, showing the 
    temperature, relative humidity, and area burned for that location.
  
4). How does the area burned vary across different months?  
    The bar chart (Area Burned by Month) can be used to compare the total area burned in different months. This can help identify which months are more prone to fires and the potential impact of seasonal changes 
     on fire occurrences.  
     Interaction: When users click on a bar in the bar chart (Area Burned by Month), filter the data in the scatter plot (Temperature vs. Relative Humidity) and the line chart (Temperature over Time) to show only 
     the records from that month. This allows users to explore the specific conditions that led to the fire occurrences in that month.
     
     
5). How does wind speed vary over time, and does it correlate with fire occurrences?  
    The line chart (Average Wind Speed over Time) can be used to visualize changes in wind speed over time. By comparing this with the bar chart (Area Burned by Month), you can explore if there's a relationship 
     between wind speed and the area burned by fires.  
     Interaction: In the line chart (Average Wind Speed over Time), hovering over a point can highlight the corresponding month in the bar chart (Area Burned by Month) and show the average temperature and 
     relative humidity in the scatter plot (Temperature vs. Relative Humidity) for that time period. This can help users explore if there's a relationship between wind speed and fire occurrences.

## Sketches

(insert one or more hand-drawn sketches of interactive visualizations that you imagine)
(describe each sketch - how is the data visualized, what are the interactions, and how do these relate to the questions/tasks)


## Prototypes

I’ve created a proof of concept visualization of this data. It's a ... and it shows ...

[![image](https://user-images.githubusercontent.com/68416/65240758-9ef6c980-daff-11e9-9ffa-e35fc62683d2.png)](https://vizhub.com/curran/eab039ad1765433cb51aad167d9deae4)

(please put a screenshot of one or more visualizations of this dataset you already made, for previous assignments, and link to them)

You can put images into here by pasting them into issues.

You can make images into links like this:

```
[![image](https://user-images.githubusercontent.com/68416/65240758-9ef6c980-daff-11e9-9ffa-e35fc62683d2.png)](https://vizhub.com/curran/eab039ad1765433cb51aad167d9deae4)
```


Also, you can study the [source](https://raw.githubusercontent.com/curran/dataviz-project-template-proposal/master/README.md) to figure out Markdown formatting. You can use the GitHub built-in editor to edit the document.

## Open Questions

(describe any fear, uncertainty, or doubt you’re having about the feasibility of implementing the sketched system. For example, “I’m not sure where to get the geographic shapes to build a map from this data” or “I don’t know how to resolve the codes to meaningful names” … Feel free to delete this section if you’re confident.)

## Milestones

(for each week, estimate what would be accomplised)
