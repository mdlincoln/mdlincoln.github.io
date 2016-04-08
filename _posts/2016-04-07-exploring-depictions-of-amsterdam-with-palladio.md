---
layout: "post"
title: "Exploring Depictions of Amsterdam with Palladio"
date: "2016-04-07 12:29"
comments: true
tags:
- visualization
- teaching
- data
---

Some tips from [Miriam Posner](http://miriamposner.com/blog/getting-started-with-palladio/) before we begin:

>A reminder that Palladio is still under development, so it can be buggy
and slow!
>
>-   Work slowly. Wait for an option to finish loading before you click it again or click something else.
>
>-   **Do not refresh the page.** You'll lose your work.
>
>-   On a related note: To start over, refresh the page.
>
>-   Clicking on the **Palladio** logo will bring you to the Palladio homepage, but it won't erase your work.

## Download the workshop data

[Download the set of CSV files that we'll work with.](/assets/docs/palladio_data.zip)

These data describe almost 1,000 objects from the Rijksmuseum made between 1500 and 1750 that depict some location in the city of Amsterdam, as labeled by curatorial teams at the Rijksmuseum.
There are three different CSV files here, but we'll start out working with just two:

1. `object_attributes.csv` - This lists, you guessed it, object attributes! This is a simplified version of the fields that are available from the original Rijksmuseum data, and has these columns

field            | description
-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
`object_id`      | A unique ID number
`title`          | The artwork title (in Dutch)
`date_start`     | The earliest date given to the object
`date_end`       | The latest date given to the object
`object_type`    | Kind of object, e.g. "print", "painting", "drawing". I have translated these terms, and also consolidated a few hyper-specific ones (e.g. "family medal" vs. "history medal")
`primary_artist` | The primary creator associated with this object. Note that in the original dataset, many objets have more than one creator (e.g. a printmaker and a publisher), though the Rijksmuseum also selects one artist as the primary. For simplicity's sake, we will use the primary artist.
`object_url`     | A link to the object's page at the Rijksmuseum
`thumb_img`      | A link to a small image of the object, when one is available

2. `object_locations.csv` - Each object has at least one (and sometimes more!) locations that it depicts. I hand-coded this table based on the depicted location names provided by the Rijksmuseum

field         | description
--------------|-------------------------------------------------------------------------
`object_id`   | A unique ID number (matches with `object_id` in `object_attributes.csv`)
`place_name`  | Place name provided by the Rijksmuseum
`place_type`  | One of 12 different place types (e.g. "gate", "church", "commerce")
`coordinates` | A latitude/longitude pair


## Loading our first dataset

Navigate to <http://palladio.designhumanities.org> and click on the "Start" button at the upper left corner.

Drag the file `object_attributes.csv` into the window where it says "Load .csv or spreadsheet". You should see text fill the box. Click load.

You should now see the data loaded into Palladio. Let's call our project name "Depictions of Amsterdam", and the table name "Rijksmuseum objects".

## Checking our data

The data view shows the fields (i.e. columns) from our spreadsheet, and also shows what type of variable Palladio has guessed our data are supposed to be. We've got a few text fields here, as well as date fields, and a special "url" field (we'll see what that does in a moment!)

Palladio tries to check for some simple irregularities in our data, like odd characters, and it's highlighted those fields with a red dot. We can ignore these dots for now, as all those characters (like commas or dashes in the _title_ field) are there on purpose.

We also have the option to set the Data Type of this field. Normally Palladio will recognize this automatically, but in some cases, we'll find that we need to manually set a field to "Date" when Palladio thinks it is only a "Number"

## Create a gallery

Time to start visualizing this collection!

Click on the "Gallery" tab at the top of the screen.
This view does what it says on the label - makes a gallery of our objects so we can see all of them while we try different types of filtering and sorting.

First we need to establish our settings:

The settings box shows us each of the elements of the gallery that we can modify, with a menu to assign fields from our data. Let's set it up like so:

- **Title**: `title`
- **Subtitle**: `primary_maker`
- **Text**: `object_type`
- **Link**: `object_url`
- **Image URL**: `thumb_url`
- **Sort by**: `start_date`

Once we've don't that, we can start "faceting", or filtering the data based on different variables. Click on the "Facet" button on the lower left corner, and in the lower right corner, use the "Dimensions" menu to select which variable we want to facet by. Try `object_type` first. Palladio will count up how many of each object type are in this dataset, and we can click on a single type to filter the gallery to just display those. Click on the red trash basket icon on the lower right to dismiss the facet filter.

We can also use the "Timeline" filter to visualize and filter based on date. Palladio should already have recognized the `date` column and created a timeline for us. You can drag and select a particular range if you like, and then drag that range around to see which different objects show up in our view.

## Add geo-coordinates and create a map

In order to map these objects, we'll need to add geo-coordinates to them. Palladio won't figure out coordinates from city names by itself, so you will already need to have created these coordinates yourself.

Navigate back to the "Data" menu, and click on the `object_id` field. We can extend these data by uploading a new CSV. Click on "Add a new table" and then drag the `object_locaiton` table into the box, and click "Load". Palladio will find matches between `object_id` in the `object_attributes` table, and the `object_id` column in the `object_location` table, and copy the data accordingly.

Now click on the "Map" button. We'll be prompted to add a data layer. Click on "New Layer". We'll be adding "Points" (the default option). Click on "Places" and select `object_id` (the only option - remember, this is the variable to which we attached our coordinates). For the tooltip label (what we see when we roll over the points), let's start with `place_name`. Check the box to size points, and do so according to `number of Rijksmuseum objects`

Zoom in until Amsterdam fits comfortably on your screen. Just like with the gallery view, we can also facet and use timelines in the map view. Let's try faceting by `place_type`, and then by `primary_maker`. Now try filtering by using the timeline. Note that you can also chose a "group by" variable in the timeline, which will color the histogram based on that variable.

Try scrolling through the timeline to see which locations were depicted at different times. Which places show up throughout this period? Are there regions of the city that only begin to be depicted in the late 17th century?

## Create networks

One question I was interested in exploring with these data as which places tended to be depicted together. To do this meant reorganizing the data a bit, so that instead of having one row per object, we would have one row per _pair of locations depicted together in an artwork_.

---

Because we are loading an entirely new base dataset, we'll have to start a new Palladio project. First, let's save our work by clicking the "Download" button at the upper right. This will download a .json file to your computer. Next time you start up Palladio, you will have the option to input this json file to restore both your data as well as the visuals that you configured from it.

---

Use your browser reload button to restart Palladio, and upload `paired_locations.csv`. Check the fields: you see some object attributes, and then the final 6 fields have to do with the locations depicted.

Click on the "Graph" option. We need to specify the variables for the source and target dimension - use `site_one_name` and `site_two_name`, respectively, and check the "Size nodes" box. Like the other data views, we can use the facet and timeline options to filter the visualization.

Like we did with the map, see if you can find any patterns when filtering by time. Also, try faceting by `primary_maker` and see the clusters of places depicted by different artists. Can you figure out why Anna Folkema's prints visualize the way they do? This is a great opportunity to set up your gallery view again, in order to get back to the images themselves.

## Saving your visualizations

Although you cannot export interactive visualizations from Palladio, you can save static images based on your representations. In the Settings menus for any of the visualizations, click the "Download" button to generate an .svg image of your visualization.

## Datasets to explore on your own

1. `cushman_collection.csv` This is a dataset of geo-referenced photographs used by [Miriam Posner in her own Palladio tutorial](http://miriamposner.com/blog/getting-started-with-palladio/). Try your hand at uploading and visualizing the data. Check Miriam's tutorial if you need some ideas for how to explore the dataset. For example:
  - Create a gallery of the photographs
  - Map the photographs, and hen filter that map based on the photograph date.

2. `europop.csv` and `euro_city_coords.csv` list the historic populations of European urban centers between 1500 and 1800.
  - Practice joining these tables. You'll need to load `europop.csv` first, and then add `euro_city_coords.csv` to the project based on the city name column.
  - Try to map these data, and then filter based on the year of the data.
  - This dataset is based on a scanned text and automatic geo-referencing, so you may probably find some mis-placed cities. Try faceting the map by `Region` and make note of any misplaced dots :)
