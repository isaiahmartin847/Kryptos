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

// Define literal types for valid values
type State = "MT" | "WY" | "ID";
type Species = "elk" | "deer" | "antelope" | "moose";

// Define type-safe interfaces for the data structures
type SpeciesData = {
  MT: Record<string, string>;
  WY: Record<string, string>;
  ID: Record<string, string>;
};

type UnitsData = {
  MT: {
    [K in Species]?: Record<string, string>;
  };
  WY: {
    [K in Species]?: Record<string, string>;
  };
  ID: {
    [K in Species]?: Record<string, string>;
  };
};

interface Props {
  children?: React.ReactNode;
}

interface CreateSessionForm {
  State: string;
  Species: string;
  HuntingUnit: string;
}

const CreateSessionForm = ({ children }: Props) => {
  const [loadingSpecies, setLoadingSpecies] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [availableSpecies, setAvailableSpecies] = useState<
    Record<string, string>
  >({});

  const [availableUnits, setAvailableUnits] = useState<Record<string, string>>(
    {}
  );

  const form = useForm<CreateSessionForm>({
    defaultValues: {
      State: "",
      Species: "",
      HuntingUnit: "",
    },
  });

  const states: Record<State, string> = {
    MT: "Montana",
    WY: "Wyoming",
    ID: "Idaho",
  };

  const selectedState = form.watch("State");
  const selectedSpecies = form.watch("Species");

  useEffect(() => {
    if (selectedState && selectedState in states) {
      fetchSpeciesForState(selectedState as State);
    } else {
      setAvailableSpecies({});
      setAvailableUnits({});
      form.setValue("Species", "");
      form.setValue("HuntingUnit", "");
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedSpecies && selectedState in states) {
      fetchHuntingUnits(selectedState as State, selectedSpecies);
    } else {
      setAvailableUnits({});
      form.setValue("HuntingUnit", "");
    }
  }, [selectedSpecies]);

  const fetchSpeciesForState = async (state: State) => {
    setLoadingSpecies(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const speciesData: SpeciesData = {
        MT: { elk: "Elk", deer: "Deer", antelope: "Antelope" },
        WY: { elk: "Elk", moose: "Moose" },
        ID: { elk: "Elk", deer: "Deer" },
      };

      const stateSpecies = speciesData[state] ?? {};
      setAvailableSpecies(stateSpecies);
    } catch (error) {
      console.error("Error fetching species:", error);
      setAvailableSpecies({});
    } finally {
      setLoadingSpecies(false);
    }
  };

  const fetchHuntingUnits = async (state: State, species: string) => {
    setLoadingUnits(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const unitsData: UnitsData = {
        MT: {
          elk: { "200": "200", "220": "220", "230": "230" },
          deer: { "300": "300", "320": "320" },
          antelope: { "400": "400", "420": "420" },
        },
        WY: {
          elk: { "500": "500", "520": "520" },
          moose: { "600": "600" },
        },
        ID: {
          elk: { "700": "700" },
          deer: { "800": "800" },
        },
      };

      const stateUnits = unitsData[state]?.[species as Species] ?? {};
      setAvailableUnits(stateUnits);
    } catch (error) {
      console.error("Error fetching hunting units:", error);
      setAvailableUnits({});
    } finally {
      setLoadingUnits(false);
    }
  };

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
                  onValueChange={field.onChange}
                  value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(states).map(([value, label]) => (
                      <SelectItem
                        key={value}
                        value={value}>
                        {label}
                      </SelectItem>
                    ))}
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
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedState || loadingSpecies}>
                  <SelectTrigger>
                    {loadingSpecies ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading species...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a species" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(availableSpecies).map(([value, label]) => (
                      <SelectItem
                        key={value}
                        value={value}>
                        {label}
                      </SelectItem>
                    ))}
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
                  value={field.value}
                  disabled={!selectedSpecies || loadingUnits}>
                  <SelectTrigger>
                    {loadingUnits ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Loading units...</span>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select a hunting unit" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(availableUnits).map(([value, label]) => (
                      <SelectItem
                        key={value}
                        value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          {children}
          <Button
            type="submit"
            variant={"secondary"}
            disabled={
              !selectedState || !selectedSpecies || !form.watch("HuntingUnit")
            }>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateSessionForm;
