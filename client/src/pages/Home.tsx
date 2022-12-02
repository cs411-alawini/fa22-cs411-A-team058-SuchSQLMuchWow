import {Header} from "../components/Header/Header"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home = () => {

    return (
        <div>
            <Header></Header>
            <Container>
                <Typography variant="h2" style={{marginTop: 100}}> Welcome to InsuranceHub </Typography>
                <Typography variant="h5"> Your one stop shop for all insurance needs </Typography>

            </Container>
        </div>

    )
}

export default Home