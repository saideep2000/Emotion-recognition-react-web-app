import React from 'react'
import { Grid } from '@mui/material';
import Header from './components/Header';
import ImageArea from './components/ImageArea';
import Footer from './components/Footer';



function Home() {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
    <Grid container direction="column" spacing={8}>
        <Grid item>
          <Header/>
        </Grid>
        <Grid item>
          <ImageArea />
        </Grid>
        <Grid item style={{ marginBottom: '-24px' }}> 
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </div>

  )
}

export default Home