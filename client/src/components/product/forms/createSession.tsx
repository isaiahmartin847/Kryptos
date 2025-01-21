import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import State from "@/types/state";
import { stat } from "fs";
import Species from "@/types/species";
import HuntingUnit from "@/types/huntingUnit";

interface CreateSessionForm {
  State: string;
  Species: string;
  HuntingUnit: string;
}

const fetchStates = async (): Promise<State[]> => {
  const response = await fetch("http://localhost:8080/states");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchSpeciesByStateID = async (stateID: string): Promise<Species[]> => {
  const response = await fetch(
    `http://localhost:8080/species?stateID=${stateID}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const fetchHuntingUnitBySpeciesID = async (
  speciesID: string
): Promise<HuntingUnit[]> => {
  const response = await fetch(
    `http://localhost:8080/hunting-units?speciesID=${speciesID}`
  );

  if (!response) {
    throw new Error("Unable to fetch the hunting units");
  }

  return response.json();
};

const CreateSessionForm = () => {
  const [stateID, setStateID] = useState<string>("");
  const [speciesID, setSpeciesID] = useState<string>("");

  const {
    data: states,
    isLoading: isStatesLoading,
    isError: isStateError,
  } = useQuery<State[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  const {
    data: species,
    isLoading: isSpeciesLoading,
    isError: isSpeciesError,
  } = useQuery<Species[], Error>({
    queryKey: ["species", stateID],
    queryFn: () => fetchSpeciesByStateID(stateID),
    enabled: !!stateID,
  });

  const {
    data: units,
    isLoading: isUnitsLoading,
    isError: isUnitError,
  } = useQuery<HuntingUnit[], Error>({
    queryKey: ["huntingUnits", speciesID],
    queryFn: () => fetchHuntingUnitBySpeciesID(speciesID),
    enabled: !!speciesID,
  });

  // this is the form
  const form = useForm<CreateSessionForm>({
    defaultValues: {
      State: "",
      Species: "",
      HuntingUnit: "",
    },
  });

  const onSubmit = (values: CreateSessionForm) => {
    console.group("Form Submission Data");
    console.log("State:", values.State);
    console.log("Species:", values.Species);
    console.log("Hunting Unit:", values.HuntingUnit);
    console.log("Full form data:", values);
    console.groupEnd();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4">
        <FormField
          control={form.control}
          name="State"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a state</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setStateID(value);
                  }}
                  value={field.value}>
                  <SelectTrigger>
                    {isStatesLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading species...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a State" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {states?.map((state) => {
                      return (
                        <SelectItem
                          value={state.ID.toString()}
                          key={state.ID}>
                          {state.FullName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a species</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSpeciesID(value);
                  }}
                  value={field.value}
                  disabled={!stateID || isSpeciesLoading}>
                  <SelectTrigger>
                    {isSpeciesLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading species...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a species" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {species?.map((species) => {
                      return (
                        <SelectItem
                          value={species.ID.toString()}
                          key={species.ID}>
                          {species.Name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="HuntingUnit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a hunting unit</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  disabled={!speciesID || isUnitsLoading}
                  value={field.value}>
                  <SelectTrigger>
                    {isUnitsLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading units...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a unit" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {units?.map((unit) => {
                      return (
                        <SelectItem value={unit.ID.toString()}>
                          {unit.Name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          {/* {children} */}
          <Button
            type="submit"
            variant={"secondary"}
            // disabled={
            // !selectedState || !selectedSpecies || !form.watch("HuntingUnit")
            // }
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSessionForm;
