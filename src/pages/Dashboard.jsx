import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from "reactstrap";
import FilterSelectMenu from "../components/Shared/FilterSelectMenu";
import axios from './../api/axios';
import { baseURL } from "../helpers/url";
import useAuth from "../hooks/useAuth";
import { useState } from 'react';
import ObservationDetailPage from "./Observation/ObservationDetailPage";
import ObservationDetails from "./Observation/ObservationDetails";
import useObservations from '../hooks/useObservations';
import AdvancedFilter from '../components/Shared/AdvancedFilter';
import "../assets/scss/component/dashboard.scss";
import ObservationListView from './Observation/ObservationListView';

const Dashboard = () =>{
    const { auth } = useAuth();
    const [observationList, setObservationList] = useState({});
    const [isObservationDetailModal, setObservationDetailModal] = useState(false);
    const [selectedObservationId,setSelectedObservationId] = useState();
    const { setObservationData, setObservationSteps, setObservationImages } = useObservations();
    const navigate = useNavigate();
    const [filterShow, setFilterShow] = useState(true);
    const [ listView, setListView ] = useState(false);
    const [ gridView, setGridView ] = useState(true);

    const getObservationData = (value) => {
        axios.get(baseURL.api+'/observation/observation_collection/?sort_by='+value,{
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.access}`
            },

        }).then((success)=>{
            setObservationList(success?.data?.data)
        }).catch((error)=>{
            console.log(error.response);
        })
    }
    useEffect(()=>{
        getObservationData()
    },[]);
    const handleObservationDetailModal = (id) => {
        setObservationDetailModal(!isObservationDetailModal);
        setSelectedObservationId(id);
    };
    const cleaningUpObservationDataForDraftSaving = async (data) => {
        setObservationImages([]);
        setObservationData([]);
        await updateStateForDraft(data)
        return true;
    }
    const updateStateForDraft = (data) => {
        setObservationSteps(prev => {
            return {
            ...prev,
            total: 3,
            active: 1,
            mode: {
                update: true,
                ...data
            }
        }
        });
    }

    const handleObservationEdit = (data) => {
        cleaningUpObservationDataForDraftSaving(data).then(r => r);
        setObservationDetailModal(false);
        setTimeout(function () {
            navigate('/observations/update');
        }, 100)
    }
    const handleFilterOpen = () => {
        setFilterShow(!filterShow)
    }
    const handleListView = () =>{
        setListView(true)
        setGridView(false)
    }
    const handleGridView = () =>{
        setGridView(true)
        setListView(false)
    }
    return (
        <>
            <FilterSelectMenu 
                dashboardFilter={true} 
                filterShow={filterShow} 
                handleFilterOpen={handleFilterOpen} 
                handleListView={handleListView} 
                handleGridView={handleGridView} 
                listView={listView}
                gridView={gridView}
            />
            <div className='observation-dashboard_content'>
                <Container>
                    <div className='d-flex'>
                        {filterShow && 
                            < AdvancedFilter />
                        }
                        
                        <div className='dashboard-card overflow-hidden'>
                            {listView && <ObservationListView 
                                observationList={observationList} 
                                isObservationDetailModal={isObservationDetailModal} 
                                setObservationDetailModal={setObservationDetailModal} 
                                setSelectedObservationId={setSelectedObservationId}
                            />}
                            {observationList && gridView &&
                                <ObservationDetailPage 
                                    observationList={observationList}
                                    isObservationDetailModal={isObservationDetailModal}
                                    setObservationDetailModal={setObservationDetailModal} 
                                    setSelectedObservationId={setSelectedObservationId}
                                />
                            }
                        </div>
                        {isObservationDetailModal && 
                        <ObservationDetails 
                            data={observationList[selectedObservationId]}  
                            modalClass="observation-details_modal" 
                            open={isObservationDetailModal} 
                            handleClose={handleObservationDetailModal} 
                            handleContinueEdit={handleObservationEdit} 
                        />
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Dashboard;