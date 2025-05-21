import React, { useState, createContext, useContext } from "react";

export const CurrentTemperatureUnitContext = createContext({});

export const useCTUContext = () => useContext(CurrentTemperatureUnitContext);
