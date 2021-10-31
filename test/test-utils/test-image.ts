class TestImage {
  public static readonly width = 546;
  public static readonly height = 460;
  public static readonly tolerance = 10;

  public static readonly probePoints = [
    {
      name: 'orange',
      x: 100,
      y: 100,
      r: 255,
      g: 127,
      b: 39,
      a: 255,
    },
    {
      name: 'black',
      x: 450,
      y: 380,
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    },
    {
      name: 'green',
      x: 360,
      y: 300,
      r: 34,
      g: 177,
      b: 76,
      a: 255,
    },

    {
      name: 'gray',
      x: 160,
      y: 270,
      r: 127,
      g: 127,
      b: 127,
      a: 255,
    },
    {
      name: 'corner-north-west',
      x: 20,
      y: 20,
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    },
    {
      name: 'corner-north-east',
      x: 526,
      y: 20,
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    },
    {
      name: 'corner-south-east',
      x: 526,
      y: 440,
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    },
    {
      name: 'corner-south-west',
      x: 20,
      y: 440,
      r: 0,
      g: 0,
      b: 0,
      a: 255,
    },
  ];
}

export default TestImage;
