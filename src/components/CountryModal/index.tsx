import { useCallback, useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { weatherApi } from "../../services/api";
import {
  Divider,
  Flex,
  Modal,
  ModalContent,
  ModalFooterButtons,
  ModalHeader,
} from "monday-ui-react-core";
import { AxiosResponse } from "axios";
import { getColumn, parseWeatherData } from "../../utils";
import WeatherForecastItem, {
  IWeatherForecastItem,
} from "../WeatherForecastItem";
import { Heading } from "monday-ui-react-core/next";
import CountryInfo from "../CountryInfo";
import WeatherForecastItemSkeleton from "../WeatherForecastItemSkeleton";
import { useToast } from "../../context/ToastContext";

type WeatherResponseType = Array<IWeatherForecastItem> | null;

const CountryModal = () => {
  const { addToast } = useToast();
  const [itemWeather, setWeatherData] = useState<WeatherResponseType>(null);
  const { isModalOpen, closeModal, selectedItem, isModalLoading, changeLoad } =
    useModal();

  const fetchWeatherData = useCallback(async () => {
    try {
      if (!selectedItem) return;
      changeLoad(true);

      const params = {
        lat: getColumn(selectedItem, "latitude"),
        lon: getColumn(selectedItem, "longitude"),
      };

      const response = await weatherApi.get<AxiosResponse<unknown>>(
        "/weather",
        { params }
      );
      const normalizedData = parseWeatherData(response?.data);
      setWeatherData(normalizedData);
      changeLoad(false);
    } catch (error) {
      addToast("Could not get weather data. Try again later.", "error");
      changeLoad(false);
      console.error(error);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (!isModalOpen || !selectedItem) return;
    fetchWeatherData();
  }, [fetchWeatherData, isModalOpen, selectedItem]);

  return (
    <Modal
      id="worktables-modal"
      title="Modal header with an Icon"
      show={isModalOpen}
      onClose={closeModal}
      closeButtonAriaLabel="close"
      width="50vw"
      contentSpacing
    >
      <ModalHeader title={"Country Details"} />
      <ModalContent>
        <Heading weight={Heading.weights.BOLD}>Info</Heading>
        <Divider />

        {selectedItem ? <CountryInfo data={selectedItem} /> : <></>}

        <Heading weight={Heading.weights.BOLD}>Forecast</Heading>
        <Divider />

        <Flex
          gap={Flex.gaps.MEDIUM}
          direction={Flex.directions.COLUMN}
          align={Flex.align.STRETCH}
        >
          {/* Render skeleton items if loading */}
          {isModalLoading ? (
            <>
              <WeatherForecastItemSkeleton />
              <WeatherForecastItemSkeleton />
            </>
          ) : (
            <>
              {itemWeather?.map((day: any, index: number) => (
                <WeatherForecastItem forecast={day} key={index} />
              ))}
            </>
          )}
        </Flex>
      </ModalContent>
      <ModalFooterButtons
        primaryButtonText="Close"
        onPrimaryButtonClick={closeModal}
      />
    </Modal>
  );
};

export default CountryModal;
