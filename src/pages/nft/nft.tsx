import React, { useState, useEffect, useRef } from 'react';
import './nft.less';
import 'antd/dist/antd.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Layout, Card, Tabs, List, Avatar, Radio } from 'antd';
import { ArrowLeftOutlined, MenuOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import {
  sessionState,
  // walletAssetState
} from '../../recoil/atom';

import {
  ProposalModel,
  // VoteOption,
  // BroadCastResult,
} from '../../models/Transaction';
import { walletService } from '../../service/WalletService';
// import { secretStoreService } from '../../storage/SecretStoreService';
// import ModalPopup from '../../components/ModalPopup/ModalPopup';
// import SuccessModalPopup from '../../components/SuccessModalPopup/SuccessModalPopup';
// import ErrorModalPopup from '../../components/ErrorModalPopup/ErrorModalPopup';
// import PasswordFormModal from '../../components/PasswordForm/PasswordFormModal';
// import { LEDGER_WALLET_TYPE } from '../../service/LedgerService';
// import { DEFAULT_CLIENT_MEMO } from '../../config/StaticConfig';
// import { ellipsis } from '../../utils/utils';

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const NftPage = () => {
  // const [form] = Form.useForm();
  // const [voteOption, setVoteOption] = useState<VoteOption>(VoteOption.VOTE_OPTION_ABSTAIN);
  // const [broadcastResult, setBroadcastResult] = useState<BroadCastResult>({});
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [inputPasswordVisible, setInputPasswordVisible] = useState(false);
  // const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  // const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isNftVisible, setIsNftVisible] = useState(false);
  // const [decryptedPhrase, setDecryptedPhrase] = useState('');
  // const [errorMessages, setErrorMessages] = useState([]);
  const [nft, setNft] = useState<any>();

  const [proposalList, setProposalList] = useState<ProposalModel[]>();
  // const [isConfirmationModalVisible, setIsVisibleConfirmationModal] = useState(false);
  const currentSession = useRecoilValue(sessionState);
  // const userAsset = useRecoilValue(walletAssetState);
  const didMountRef = useRef(false);

  const [nftList, setNftList] = useState<any[]>([]);
  const [nftView, setNftView] = useState('grid');

  // const handleCancelConfirmationModal = () => {
  //   setIsVisibleConfirmationModal(false);
  // };

  // const closeSuccessModal = () => {
  //   setIsSuccessModalVisible(false);
  //   setIsVisibleConfirmationModal(false);
  // };

  // const closeErrorModal = () => {
  //   setIsErrorModalVisible(false);
  // };

  // const showConfirmationModal = () => {
  //   setInputPasswordVisible(false);
  //   setIsVisibleConfirmationModal(true);
  // };

  // const showPasswordInput = () => {
  //   if (decryptedPhrase || currentSession.wallet.walletType === LEDGER_WALLET_TYPE) {
  //     showConfirmationModal();
  //   } else {
  //     setInputPasswordVisible(true);
  //   }
  // };

  // const onWalletDecryptFinish = async (password: string) => {
  //   const phraseDecrypted = await secretStoreService.decryptPhrase(
  //     password,
  //     currentSession.wallet.identifier,
  //   );
  //   setDecryptedPhrase(phraseDecrypted);
  //   showConfirmationModal();
  // };

  // const onRadioChange = e => {
  //   setVoteOption(e.target.value);
  // };

  // const onVote = async () => {
  //   showPasswordInput();
  // };

  // const onConfirm = async () => {
  //   if (!nft) {
  //     return;
  //   }

  //   setConfirmLoading(true);
  //   try {
  //     // const proposalID =
  //     //   nft?.proposal_id !== null && nft?.proposal_id !== undefined
  //     //     ? nft?.proposal_id
  //     //     : '';
  //     // const sendResult = await walletService.sendVote({
  //     //   voteOption,
  //     //   proposalID,
  //     //   memo: DEFAULT_CLIENT_MEMO,
  //     //   decryptedPhrase,
  //     //   asset: userAsset,
  //     //   walletType: currentSession.wallet.walletType,
  //     // });

  //     // setBroadcastResult(sendResult);
  //     setIsVisibleConfirmationModal(false);
  //     setConfirmLoading(false);
  //     // setInputPasswordVisible(false);
  //     // setIsSuccessModalVisible(true);
  //   } catch (e) {
  //     // setErrorMessages(e.message.split(': '));
  //     setIsVisibleConfirmationModal(false);
  //     setConfirmLoading(false);
  //     // setInputPasswordVisible(false);
  //     // setIsErrorModalVisible(true);
  //     // eslint-disable-next-line no-console
  //     console.log('Error occurred while transfer', e);
  //   }
  //   setConfirmLoading(false);
  // };

  const nftViewOptions = [
    { label: <MenuOutlined />, value: 'list' },
    { label: <AppstoreOutlined />, value: 'grid' },
  ];

  useEffect(() => {
    const fetchProposalList = async () => {
      const list: ProposalModel[] = await walletService.retrieveProposals(
        currentSession.wallet.config.network.chainId,
      );

      const nftApi = await axios
        .create({
          baseURL: 'https://api.opensea.io/api/v1/',
        })
        .get(
          'assets?order_direction=desc&offset=0&limit=2&owner=0x701a24d812e4d9827ec8dd2b3eed726ffd9b4065',
        );

      setNftList(nftApi.data.assets.concat(nftApi.data.assets).concat(nftApi.data.assets));

      const latestProposalOnTop = list.reverse();
      setProposalList(latestProposalOnTop);
    };

    if (!didMountRef.current) {
      fetchProposalList();
      didMountRef.current = true;
    }
    // eslint-disable-next-line
  }, [proposalList, setProposalList]);

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background">My NFT</Header>
      <div className="header-description">An overview of your NFT Collection.</div>
      <Content>
        {isNftVisible ? (
          <div className="site-layout-background nft-content">
            <div className="container">
              <Layout className="nft-detail">
                <Content>
                  <a>
                    <div
                      className="back-button"
                      onClick={() => setIsNftVisible(false)}
                      style={{ fontSize: '16px' }}
                    >
                      <ArrowLeftOutlined style={{ fontSize: '16px', color: '#1199fa' }} /> Back to
                      NFT List
                    </div>
                  </a>
                  <div className="nft-image">
                    <img alt="example" src={nft?.image_url} />
                  </div>
                </Content>
                <Sider width="500px">
                  <>
                    <div className="title">{nft?.name}</div>
                    <div className="item">
                      <div className="status">#{nft.id} Edition: </div>
                    </div>
                    <div className="item">
                      {/* <div className="date">
                      Start: {moment(nft?.voting_start_time).format('DD/MM/YYYY, h:mm A')}{' '}
                      <br />
                      End: {moment(nft?.voting_end_time).format('DD/MM/YYYY, h:mm A')}
                    </div> */}
                    </div>

                    <div className="description">{nft?.description}</div>
                  </>
                </Sider>
              </Layout>
            </div>
          </div>
        ) : (
          <Tabs defaultActiveKey="1">
            <TabPane tab="NFT Collection" key="1">
              <div className="site-layout-background nft-content">
                <div className="view-selection">
                  <Radio.Group
                    options={nftViewOptions}
                    defaultValue="grid"
                    onChange={e => {
                      setNftView(e.target.value);
                    }}
                    optionType="button"
                  />
                </div>
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 3,
                    xxl: 3,
                  }}
                  dataSource={nftList}
                  renderItem={item =>
                    nftView === 'grid' ? (
                      <List.Item>
                        <Card
                          style={{ width: 200 }}
                          cover={<img alt="example" src={item?.image_thumbnail_url} />}
                          hoverable
                          onClick={() => {
                            setNft(item);
                            setIsNftVisible(true);
                          }}
                          className="nft"
                        >
                          <Meta
                            title={item?.name}
                            description={
                              <>
                                <Avatar src="https://avatars.githubusercontent.com/u/7971415?s=40&v=4" />
                                CryptoPunks
                              </>
                            }
                          />
                        </Card>
                      </List.Item>
                    ) : (
                      <></>
                    )
                  }
                  pagination={{
                    pageSize: 6,
                  }}
                />
              </div>
            </TabPane>
          </Tabs>
        )}
      </Content>
      <Footer />
      {/* <PasswordFormModal
        description="Input the app password decrypt wallet"
        okButtonText="Decrypt wallet"
        onCancel={() => {
          setInputPasswordVisible(false);
        }}
        onSuccess={onWalletDecryptFinish}
        onValidatePassword={async (password: string) => {
          const isValid = await secretStoreService.checkIfPasswordIsValid(password);
          return {
            valid: isValid,
            errMsg: !isValid ? 'The password provided is incorrect, Please try again' : '',
          };
        }}
        successText="Wallet decrypted successfully !"
        title="Provide app password"
        visible={inputPasswordVisible}
        successButtonText="Continue"
        confirmPassword={false}
      /> */}
      {/* <ModalPopup
        isModalVisible={isConfirmationModalVisible}
        handleCancel={handleCancelConfirmationModal}
        handleOk={() => { }}
        footer={[
          <Button key="submit" type="primary" loading={confirmLoading} onClick={onConfirm}>
            Confirm
          </Button>,
          <Button key="back" type="link" onClick={handleCancelConfirmationModal}>
            Cancel
          </Button>,
        ]}
        okText="Confirm"
      >
        <>
          <div className="title">Confirm Vote Transaction</div>
          <div className="description">Please review the below information. </div>
          <div className="item">
            <div className="label">Sender Address</div>
            <div className="address">{`${currentSession.wallet.address}`}</div>
          </div>
          <div className="item">
            <div className="label">Vote to Proposal</div>
            <div className="address">{`#${nft?.proposal_id} ${nft?.content.title}`}</div>
          </div>
          <div className="item">
            <div className="label">Vote</div>
            <div>{processVoteTag(voteOption)}</div>
          </div>
        </>
      </ModalPopup> */}
      {/* <SuccessModalPopup
        isModalVisible={isSuccessModalVisible}
        handleCancel={closeSuccessModal}
        handleOk={closeSuccessModal}
        title="Success!"
        button={null}
        footer={[
          <Button key="submit" type="primary" onClick={closeSuccessModal}>
            Ok
          </Button>,
        ]}
      >
        <>
          {broadcastResult?.code !== undefined &&
            broadcastResult?.code !== null &&
            broadcastResult.code === walletService.BROADCAST_TIMEOUT_CODE ? (
            <div className="description">
              The transaction timed out but it will be included in the subsequent blocks
            </div>
          ) : (
            <div className="description">Your vote was broadcasted successfully!</div>
          )}
        </>
      </SuccessModalPopup> */}
      {/* <ErrorModalPopup
        isModalVisible={isErrorModalVisible}
        handleCancel={closeErrorModal}
        handleOk={closeErrorModal}
        title="An error happened!"
        footer={[]}
      >
        <>
          <div className="description">
            The vote transaction failed. Please try again later.
            <br />
            {errorMessages
              .filter((item, idx) => {
                return errorMessages.indexOf(item) === idx;
              })
              .map((err, idx) => (
                <div key={idx}>- {err}</div>
              ))}
          </div>
        </>
      </ErrorModalPopup> */}
    </Layout>
  );
};

export default NftPage;
